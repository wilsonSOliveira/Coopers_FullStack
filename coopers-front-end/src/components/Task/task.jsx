import './task.css'
import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../../constants/BaseUrl'
import taskDone from '../../assets/taskDone.png'

export default function Task(props) {
    const [editor, setEditor] = useState("close")
    const [inputValue, setInputValue] = useState("")

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }

    const changeEditor = (value) => {
        setEditor(value)
    }

    const deleteTask = (id) => {
        const body = {
            id: id
        }
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.post(`${BASE_URL}/task/delete/task`, body, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    alert(response.data.message)
                    props.allTasks()
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const updateTask = () => {
        const body = {
            id: props.tasks.id,
            status: props.tasks.status,
            task: inputValue
        }
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.put(`${BASE_URL}/task/update`, body, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    alert("task changed")
                    props.allTasks()
                    changeEditor("close")
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const statesTask = () => {
        const body = {
            id: props.tasks.id,
            status: "DONE",
            task: props.tasks.task
        }
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.put(`${BASE_URL}/task/update`, body, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    alert(response.data.message)
                    props.allTasks()
                    changeEditor("close")
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }


    return (
        <div>
            {editor === "close" ?
                <div className='editorClose'>
                    <div className='task-checkbox'>
                    {props.tasks.status == "TO_DO" ?
                    <div className='checkbox'>
                    <input type="checkbox" id="toggle" onClick={statesTask}/>
                    <label class="checkbox" for="toggle">
                    </label>
                    </div>
                        :
                        <img src={taskDone} />}
                    <div className='task-text'> {props.tasks.task}</div>
                    </div>
                    <div className='two-buttons'>
                        <span onClick={() => deleteTask(props.tasks.id)}> delete</span>
                        <span onClick={() => changeEditor("open")}> edit</span>
                    </div>
                </div> :
                <div className='editorOpen'>
                    <input type='text' onChange={handleInput} defaultValue={props.tasks.task} />
                    <div className='buttons'>
                        <button onClick={updateTask}>submit</button>
                        <button onClick={() => changeEditor("close")}>cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}