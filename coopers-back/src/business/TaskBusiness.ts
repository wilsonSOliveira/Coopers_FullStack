import { NotFoundError } from './../errors/NotFoundError';
import { ICreateTaskInput, ICreateTaskOutput, Task, ITaskDB, IAllTaskOutput, IDeleteTaskOutput, IDeleteTaskInput, IDeleteAllTasksInput, IDeleteAllTasksOutput, IEditTasksInput, STATUS } from './../models/TaskModel';
import { AuthenticationError } from './../errors/AuthenticationError';
import { ParamsError } from './../errors/ParamsError';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TaskDataBase } from './../database/TaskDatabase';

export class TaskBusiness {
    constructor(
        private taskDatabase: TaskDataBase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    public createTaskBusiness = async (input: ICreateTaskInput) => {
        const { token, task } = input

        if (!token || !task) {
            throw new ParamsError()
        }

        if (typeof task !== "string") {
            throw new ParamsError("Parâmetro 'task' inválido")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }
        const userId = payload.id

        const id = this.idGenerator.generate()

        const newTask = new Task(
            id,
            userId,
            task
        )


        await this.taskDatabase.createTaskDataBase(newTask)

        const response: ICreateTaskOutput = {
            message: "tarefa adicionada",
            id: newTask.getId()
        }

        return response
    }

    public allTaskBussiness = async (input: any) => {
        const { token } = input

        if (!token) {
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {

            throw new AuthenticationError()

        }
        const userId = payload.id

        const result = await this.taskDatabase.allTaskDataBase(userId)

        const tasks: Task[] = result.map((task) => {
            return new Task(
                task.id,
                task.user_id,
                task.task,
                task.status

            )
        })

        const response: IAllTaskOutput = {
            tasks
        }

        return response
    }


    public deleteTaskBusiness = async (input:IDeleteTaskInput)=>{
        const {token,id} = input

        if (!token||!id) {
            throw new ParamsError()
        }

        if (typeof id !== "string") {
            throw new ParamsError("Parâmetro 'id' inválido")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        const findTask= await this.taskDatabase.findTaskByIdDataBase(id)

        if(!findTask){
            throw new NotFoundError("task não encontrada")
        }

        await this.taskDatabase.deleteTaskDataBase(id)

        const response:IDeleteTaskOutput = {
            message:"Task deletada"
        }

        return response


    } 


    public deleteAllTasksBusiness = async (input:IDeleteAllTasksInput)=>{
        const {token,status} = input
        

        if (!token||!status) {
            throw new ParamsError()
        }

        if (status !== STATUS.DONE && status!==STATUS.TO_DO) {
            throw new ParamsError("Parâmetro 'status' inválido")
        }



        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        const userId = payload.id

        const task={
            user_id:userId,
            status:status
        }

        await this.taskDatabase.deleteAllTaskDataBase(task)

        const response:IDeleteAllTasksOutput = {
            message:"Task deletada"
        }

        return response
    }


    public editTaskBusiness = async (input:IEditTasksInput)=>{
        const {token,id,task,status} = input

        if (!token||!task||!id||!status) {
            throw new ParamsError()
        }

        if (typeof id !== "string") {
            throw new ParamsError("Parâmetro 'id' inválido")
        }

        if (typeof task !== "string") {
            throw new ParamsError("Parâmetro 'task' inválido")
        }

        if (status !== STATUS.DONE && status!==STATUS.TO_DO) {
            throw new ParamsError("Parâmetro 'status' inválido")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }


        const findTask = await this.taskDatabase.findTaskByIdDataBase(id)

        if(!findTask){
            throw new NotFoundError("task não encontrada")
        }

        const editTask = {
            task,
            status,
            id
        }

        await this.taskDatabase.editTaskDataBase(editTask)

        const response:IDeleteAllTasksOutput = {
            message:"Task atualizada"
        }

        return response
    }


}