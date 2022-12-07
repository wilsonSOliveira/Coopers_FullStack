import { STATUS, ITaskDB } from "../../models/TaskModel"
import { IUserDB, } from "../../models/UserModel"

export const usersData: IUserDB[] = [
    {
        id: "101",
        userName: "Astrodev",
        password: "$2a$12$RBAWOHpUvGTE.MEeIohAzec9tlVqtNA/x2PMPt/Hrt0vI437cQdJC", // bananinha
    },
    {
        id: "102",
        userName: "Fulano",
        password: "$2a$12$PULtVNlAll87D6E8pR/0HO9vbzVDPaUMA89rc5cNmYoAAepbwmkcO", // qwerty00
    },
    {
        id: "103",
        userName: "Ciclana",
        password: "$2a$12$LkWMqS3oPhP2iVMcZOVvWer9ahUPulxjB0EA4TWPxWaRuEEfYGu/i", // asdfg123
    }
]

export const taskData: ITaskDB[] = [
    {
        id: '001',
        user_id: "101",
        task: 'aprender php',
        status: STATUS.TO_DO
    },
    {
        id: '003',
        user_id: "102",
        task: 'aprender css',
        status: STATUS.TO_DO
    },
    {
        id: '002',
        user_id: "101",
        task: 'aprender ingles',
        status: STATUS.TO_DO
    },
]


