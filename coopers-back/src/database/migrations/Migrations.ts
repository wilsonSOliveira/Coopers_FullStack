import { taskData, usersData } from './data';
import { BaseDatabase } from "../BaseDatabase"
import { TaskDataBase } from "../TaskDatabase"
import { UserDatabase } from "../UserDatabase"

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Populating tables...")
            await this.insertData()
            console.log("Tables populated successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${TaskDataBase.TABLE_TASK};
        DROP TABLE IF EXISTS ${UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            userName VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${TaskDataBase.TABLE_TASK} (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            task VARCHAR(1064) NOT NULL,
            status ENUM ("TO_DO", "DONE") NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Coopers_Users(id) ); 

        `)
    }

    insertData = async () => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(usersData);
            await BaseDatabase
            .connection(TaskDataBase.TABLE_TASK)
            .insert(taskData)

    }
}

const migrations = new Migrations()
migrations.execute()