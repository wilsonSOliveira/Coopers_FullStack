import './ToDoList.css'
import goodthing1 from '../../assets/goodthing1.png'
import goodthing2 from '../../assets/goodthing2.png'
import goodthing3 from '../../assets/goodthing3.png'
import contact from '../../assets/contact.png'
import vector from '../../assets/vector.png'
import logo from '../../assets/logo.png'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../constants/BaseUrl'
import { useState } from 'react'
import taskDoneImg from '../../assets/taskDone.png'
import Ellipse from '../../assets/Ellipse.png'
import Task from '../Task/task'


export default function ToDOList() {
    const [tasks, setTasks] = useState([])
    const [newTaskDiv, setNewTaskDiv] = useState(false)
    const [newTaskValue, setNewTaskValue] = useState("")

    useEffect(() => {
        allTasks()
    }, [
        localStorage.getItem("CoopersToken")
    ])

    const changeDivInput = () => {
        setNewTaskDiv(!newTaskDiv)
    }

    const handleNewTask = (e) => {
        setNewTaskValue(e.target.value)
    }


    const allTasks = () => {
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.get(`${BASE_URL}/task/all`, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    setTasks(response.data.tasks)
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const erraseAll = (status) => {
        const body = {
            status: status
        }
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.post(`${BASE_URL}/task/delete/all`, body, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    alert(response.data.message)
                    allTasks()
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const newTask = () => {
        const body = {
            task: newTaskValue
        }
        if (localStorage.getItem("CoopersToken") !== null) {
            axios.post(`${BASE_URL}/task/create`, body, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('CoopersToken'))
                }
            })
                .then((response) => {
                    alert("your new task has been added")
                    allTasks()
                    setNewTaskValue("")
                    changeDivInput()
                }).catch((err) => {
                    alert(err.response.data.message)
                })
        }
    }

    const taskToDo = tasks.filter(item => {
        return item.status === "TO_DO"
    }).map((item) => {
        return (
            <Task key={item.id} tasks={item} allTasks={allTasks} ></Task>
        )
    })

    const taskDone = tasks.filter(item => {
        return item.status === "DONE"
    }).map((item) => {
        return (
            <Task key={item.id} tasks={item} allTasks={allTasks} ></Task>
        )
    })


    return (
        <main className='main' id='main'>
            <div className="lists">
                <div className="rectangle">
                    <div className="straight"></div>
                    <div className="sub-rectangle">
                        <div className="sub-straight"></div>
                    </div>
                </div>
                <div className="coluns">
                    <section className='colunm to-do'>
                        <div className="title">
                            <h1>To-do</h1>
                            <h3>Take a breath<br />
                                Start doing</h3>
                        </div>
                        {localStorage.getItem("CoopersToken") === null ?
                            <div className="tasks">
                                <div className='task'>
                                    <img src={Ellipse} /> This is a new task
                                </div>
                                <div className='task'>
                                    <img src={Ellipse} />Create the drag-and-drop function
                                </div>
                                <div className='task'>
                                    <img src={Ellipse} />Add new tasks
                                </div >
                                <div className='task'>
                                    <img src={Ellipse} />Delete itens
                                </div>
                                <div className='task'>
                                    <img src={Ellipse} />Erase all
                                </div>
                                <div className='task'>
                                    <img src={Ellipse} />Checked item goes to Done list
                                </div >
                                <div className='task'>
                                    <img src={Ellipse} />This item label may be edited
                                </div>
                                <div className='task'>
                                    <img src={Ellipse} />Editing an item...
                                </div>

                            </div> :
                            <div className='tasks'>
                                {taskToDo}
                            </div>}
                        <div className={'input-' + newTaskDiv}>
                            <input type="text" onChange={handleNewTask} value={newTaskValue} />
                            <button onClick={newTask}>ok</button>
                        </div>
                        <div className="button-erase">
                            <button onClick={changeDivInput}>new task</button>
                            <button onClick={() => erraseAll("TO_DO")}>erase all</button>
                        </div>
                    </section>
                    <section className='colunm done'>
                        <div className="title">
                            <h1>Done</h1>
                            <h3>Congratulations</h3>
                        </div>
                        {localStorage.getItem("CoopersToken") === null ?
                            <div className="tasks">
                                <div className='task'>
                                    <img src={taskDoneImg} />Get FTP credentials
                                </div >
                                <div className='task'>
                                    <img src={taskDoneImg} />Home Page Design
                                </div>
                                <div className='task'>
                                    <img src={taskDoneImg} />E-mail John about the deadline
                                </div>
                                <div className='task'>
                                    <img src={taskDoneImg} />Create a Google Drive folder
                                </div >
                                <div className='task'>
                                    <img src={taskDoneImg} />Send a gift to the client
                                </div >
                            </div> :
                            <div className='tasks'>
                                {taskDone}
                            </div>}
                        <div className="button-erase">
                            <button onClick={() => erraseAll("DONE")}>erase all</button>
                        </div>
                    </section>
                </div>
            </div>
            <section className="good-things">
                <div className="rectangle">
                    <div className="title">
                        <h1>good things</h1>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <div className="card-top">
                                <img src={goodthing1} alt="colegas de trabalho" />
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <div className="card-botton">
                                <div className="text">
                                    <h4>
                                        function
                                    </h4>
                                    <p>
                                        Organize your daily job enhance your life performance
                                    </p>
                                </div>
                                <div className="read-more">read more</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-top">
                                <img src={goodthing2} alt="colegas de trabalho" />
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <div className="card-botton">
                                <div className="text">
                                    <h4>
                                        function
                                    </h4>
                                    <p>
                                        Mark one activity as done makes your brain understands the power of doing.
                                    </p>
                                </div>
                                <div className="read-more">read more</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-top">
                                <img src={goodthing3} alt="colegas de trabalho" />
                                <div className="logo">
                                    <img src={logo} alt="logo" />
                                </div>
                            </div>
                            <div className="card-botton">
                                <div className="text">
                                    <h4>
                                        function
                                    </h4>
                                    <p>
                                        Careful with missunderstanding the difference between a list of things and a list of desires.
                                    </p>
                                </div>
                                <div className="read-more">read more</div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className='contact'>
                <div className="rectangle-top">
                    <img src={contact} alt="contato" />
                    <div className="row"></div>
                </div>
                <div className="rectangle-botton">
                    <div className="title">
                        <div className='square'>
                            <img src={vector} alt="vector" />
                        </div>
                        <div className="text">
                            Get in <br /><b>Touch</b>
                        </div>
                    </div>
                    <div className="message-box">
                        <div className="box">
                            <div className="text">
                                <h6>your name</h6>
                            </div>
                            <input type="text" id='name' />
                        </div>
                        <div className='two-boxes'>
                            <div className="box">
                                <div className="text">
                                    <h6>email</h6>
                                </div>
                                <input type="text" />
                            </div>
                            <div className="box" id='phone'>
                                <div className="text">
                                    <h6>phone</h6>
                                </div>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="box">
                            <div className="text">
                                <h6>message</h6>
                            </div>
                            <textarea type="text" />
                        </div>
                        <div className="box">
                            <button>send now</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}