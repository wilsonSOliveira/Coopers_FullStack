
export enum STATUS {
TO_DO = "TO_DO",
DONE = "DONE"
}

export interface ITaskDB {
    id:string,
    user_id:string,
    task:string
    status:STATUS
}

export interface ICreateTaskInput {
    token:string,
    task:string
}

export interface ICreateTaskOutput{
    message:string,
    id:string
}

export interface IAllTaskInput{
    token:string
} 

export interface IAllTaskOutput{
tasks:Task[]
}

export interface IDeleteTaskInput{
token:string,
id:string
}

export interface IDeleteTaskOutput{
    message:string
}

export interface IDeleteAllTasksInput{
token:string,
status:STATUS
}
export interface IDeleteAllTasksOutput{
    message:string
}

export interface IEditTasksInput{
token:string,
id:string,
task:string,
status:STATUS
}

export interface IEditTasksOutput{
message:string
}

export interface IEditTaskDB{
    task:string,
    status:STATUS
    id:string
}


export class Task {
    constructor(
        private id: string,
        private userId: string,
        private task: string,
        private status: STATUS = STATUS.TO_DO
    ) { }

    public getId = () => {
        return this.id
    }

    public getUserID = () => {
        return this.userId
    }

    public getTask = () => {
        return this.task
    }

    public getstatus = () => {
        return this.status
    }



}