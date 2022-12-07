import {  IEditTaskDB } from './../models/TaskModel';
import { Task, ITaskDB } from "../models/TaskModel";
import { BaseDatabase } from "./BaseDatabase";

export class TaskDataBase extends BaseDatabase {
public static TABLE_TASK = 'Coopers_To_Do'

public createTaskDataBase = async (task:Task) =>{

const taskDB:ITaskDB ={
    id: task.getId(),
    user_id: task.getUserID(),
    task:task.getTask(),
    status:task.getstatus()
}
    await BaseDatabase.connection(TaskDataBase.TABLE_TASK)
    .insert(taskDB)
}


public allTaskDataBase = async (userId:string)=>{
    const result = await BaseDatabase.connection(TaskDataBase.TABLE_TASK)
    .select()
    .where({
        user_id:userId,
    })
    return result
}

public deleteTaskDataBase = async (id:string) => {

    await BaseDatabase
        .connection(TaskDataBase.TABLE_TASK)
        .delete()
        .where({id:id})
}

public deleteAllTaskDataBase = async (tasks:any) => {

    await BaseDatabase
        .connection(TaskDataBase.TABLE_TASK)
        .delete()
        .where({user_id:tasks.user_id})
        .andWhere({status:tasks.status})
}

public findTaskByIdDataBase = async (id:string)=>{

    const result =await BaseDatabase
        .connection(TaskDataBase.TABLE_TASK)
        .select()
        .where({id:id})

        return result
}


public editTaskDataBase = async (task:IEditTaskDB)=>{

    await BaseDatabase
        .connection(TaskDataBase.TABLE_TASK)
        .update({
            task:task.task,
            status:task.status
        })
        .where({id:task.id})
}
}


