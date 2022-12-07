import { ILoginInputDTO, ISignupInputDTO } from './../models/UserModel';
import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) {}

    public signup = async (req: Request, res: Response) => {
        try {
            const input: ISignupInputDTO = {
                userName: req.body.userName,
                password: req.body.password
            }


            const response = await this.userBusiness.signup(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: ILoginInputDTO = {
                userName: req.body.userName,
                password: req.body.password
            }


            const response = await this.userBusiness.login(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

}