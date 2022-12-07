import { Authenticator } from './../services/Authenticator';
import { HashManager } from './../services/HashManager';
import { IdGenerator } from './../services/IdGenerator';
import { TaskDataBase } from './../database/TaskDatabase';
import { TaskBusiness } from './../business/TaskBusiness';
import { TaskController } from './../controller/TaskController';
import { Router } from 'express';

export const taskRouter = Router()

const taskController = new TaskController(
    new TaskBusiness(
        new TaskDataBase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )

    )
    
    taskRouter.post("/create", taskController.createTaskControler)
    taskRouter.post("/delete/task", taskController.deleteTaskControler)
    taskRouter.post("/delete/all", taskController.deleteAllTasksControler)
    taskRouter.get("/all", taskController.allTaskControler)
    taskRouter.put("/update", taskController.editTaskControler)
    