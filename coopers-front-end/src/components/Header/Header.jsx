import './header.css'
import logo from '../../assets/logo.png'
import living from '../../assets/office.jpg'
import scroll from '../../assets/scroll.png'


export default function Header({handleOpenModal}) {
const logOut= () =>{
localStorage.removeItem('CoopersToken')
window.location.reload()
}


    return (
        <header className='header'>
            <div className="top">
            <div className="top-box">
                <div className='logo'>
                    <img src={logo} alt="logo" />
                    <h1>coopers</h1>
                </div>
                <div className='button'>
                    {localStorage.getItem("CoopersToken")===null?
                    <button onClick={handleOpenModal} >login</button>
                    :<button onClick={logOut} >logout</button>}
                    
                </div>

            </div>
            <div className="columns">
            <section className="column-left">
                <div className="title">
                    <h1>Organize</h1>
                    <h2>your daily jobs</h2>
                </div>
                <div className="sub-title">
                <h4>The only way to get things done</h4>
                </div>
                <div className="button">
                    <a href='#main'><button>Go to To-do list</button></a>
                </div>
            </section>
            <figure className="column-right">
                <img id='logo' src={logo} alt="logo da empresa" />
                <img id='living-room' src={living} alt="sala" />
                
            </figure>
            </div>
                <div className="arrow">
                    <img  src={scroll} alt="arrow-scroll"/>
                </div>
            </div>
            <section className="bottom">
                <div className="rectangle">
                </div>
                    <div className="text">
                        <div className="title">To-do List</div>
                    <h4>Drag and drop to set your main priorities, check when done and create what´s new.</h4>
                    </div>
                </section>
        </header>
    )
}