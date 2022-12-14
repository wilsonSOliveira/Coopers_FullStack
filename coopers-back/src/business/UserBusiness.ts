import { AuthorizationError } from './../errors/AuthorizationError';
import { UserDatabase } from "../database/UserDatabase"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { ParamsError } from "../errors/ParamsError"
import { ILoginInputDTO, ILoginOutputDTO, ISignupInputDTO, ISignupOutputDTO, User } from "../models/UserModel"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    public signup = async(input : ISignupInputDTO)=>{
        const {userName,password} = input

        if (!userName || !password) {
            throw new ParamsError()
        }

        if (typeof userName !== "string" || userName.length < 3) {
            throw new ParamsError("Parâmetro 'userName' inválido")
        }


        if (typeof password !== "string" || password.length < 6) {
            throw new ParamsError("Parâmetro 'password' inválido")
        }

        const userByUserName = await this.userDatabase.findByUserName(userName)

        if (userByUserName) {
            throw new ConflictError("userName já cadastrado")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            userName,
            hashedPassword,
        )

        await this.userDatabase.createUser(user)

        const payload: ITokenPayload = {
            id: user.getId()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ISignupOutputDTO = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return response
    }

    public login = async (input: ILoginInputDTO) => {
        const {userName,password} = input

        if (!userName || !password) {
            throw new ParamsError()
        }

        if (typeof userName !== "string" || userName.length < 3) {
            throw new ParamsError("Parâmetro 'userName' inválido")
        }


        if (typeof password !== "string" || password.length < 6) {
            throw new ParamsError("Parâmetro 'password' inválido")
        }


        const userDB = await this.userDatabase.findByUserName(userName)

        if (!userDB) {
            throw new NotFoundError("usuario não cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.userName,
            userDB.password,
        )

        
        const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword())


        if (!isPasswordCorrect) {
            throw new AuthorizationError("Senha incorreta")
        }

        const payload: ITokenPayload = {
            id: user.getId(),
        }


        const token = this.authenticator.generateToken(payload)

        const response:ILoginOutputDTO = {
            message: "Login realizado com sucesso",
            token
        }

        return response
    }

}