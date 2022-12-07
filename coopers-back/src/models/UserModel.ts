

export interface IUserDB {
    id: string,
    userName: string,
    password: string,
}

export interface ISignupInputDTO {
    userName:string,
    password:string
}

export interface ISignupOutputDTO {
    message:string,
    token:string
}

export interface ILoginInputDTO {
    userName:string,
    password:string
}

export interface ILoginOutputDTO {
    message:string,
    token:string
}

export class User {
    constructor(
        private id: string,
        private userName: string,
        private password: string,
    ) {}

    public getId = () => {
        return this.id
    }

    public getUserName = () => {
        return this.userName
    }


    public getPassword = () => {
        return this.password
    }


}
