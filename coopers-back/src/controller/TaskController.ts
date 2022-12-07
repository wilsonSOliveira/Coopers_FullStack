import { IDeleteTaskInput, IDeleteAllTasksInput, IEditTasksInput } from './../models/TaskModel';
import { Request, Response } from 'express';
import { IAllTaskInput, ICreateTaskInput } from '../models/TaskModel';
import { TaskBusiness } from './../business/TaskBusiness';
export class TaskController {
    constructor(
        private taskBusiness: TaskBusiness
    ) {}

    public createTaskControler = async (req: Request, res: Response) => {
        try {
            const input:ICreateTaskInput = {
                token: req.headers.authorization as string,
                task: req.body.task
            }

            const response = await this.taskBusiness.createTaskBusiness(input)

            res.status(201).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public allTaskControler = async (req: Request, res: Response) => {
        try {
            const input:IAllTaskInput = {
                token: req.headers.authorization as string
            }
            
            const response = await this.taskBusiness.allTaskBussiness(input)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public deleteTaskControler = async (req: Request, res: Response) => {
        try {
            const input:IDeleteTaskInput = {
                token: req.headers.authorization as string,
                id:req.body.id
            }
            
            const response = await this.taskBusiness.deleteTaskBusiness(input)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public deleteAllTasksControler = async (req: Request, res: Response) => {
        try {
            const input:IDeleteAllTasksInput = {
                token: req.headers.authorization as string,
                status:req.body.status
            }
            console.log(input)
            
            const response = await this.taskBusiness.deleteAllTasksBusiness(input)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }

    public editTaskControler = async (req: Request, res: Response) => {
        try {
            const input:IEditTasksInput = {
                token: req.headers.authorization as string,
                status:req.body.status,
                id:req.body.id,
                task:req.body.task
            }
            
            const response = await this.taskBusiness.editTaskBusiness(input)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(400).send({ message: error.message })
        }
    }
}
