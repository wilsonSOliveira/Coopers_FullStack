import './singUp.css'
import modal from '../../assets/modal.png'
import axios from 'axios'
import { BASE_URL } from '../../constants/BaseUrl'
import { useState } from 'react'

export default function SingUp({ handleModal }) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const singUp = () => {
        const body ={
            userName: userName,
            password:password
        }
        axios.post(`${BASE_URL}/users/signup`,body)
            .then((response)=>{
                localStorage.setItem("CoopersToken",JSON.stringify(response.data.token))
                handleModal()
            })
            .catch((err)=>{
                alert(err.response.data.message)
            })
    }

    const login = () => {
        const body ={
            userName: userName,
            password:password
        }
        axios.post(`${BASE_URL}/users/login`,body)
            .then((response)=>{
                localStorage.setItem("CoopersToken",JSON.stringify(response.data.token))
                handleModal()
            })
            .catch((err)=>{
                alert(err.response.data.message)
            })
    }



    return (
        <div className='signup'>
            <header>
                <h6 onClick={handleModal}>close</h6>
            </header>
            <main>
                <div className="picture">
                    <img src={modal} alt="modal" />
                </div>
                <section>
                    <div className="title">
                        Sign in <b /><span>to access your list </span>
                    </div>
                    <div className='two-boxes'>
                        <div className="box">
                            <div className="text">
                                <h6>username</h6>
                            </div>
                            <input type="text" onChange={handleUserName} />
                        </div>
                        <div className="box">
                            <div className="text">
                                <h6>password</h6>
                            </div>
                            <input type="text"  onChange={handlePassword}/>
                        </div>
                        <div className="box">
                            <button onClick={login}>login</button>
                            <button onClick={singUp}>Sing up </button>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    )
}