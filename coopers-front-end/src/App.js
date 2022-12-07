import Footer from "./components/Footer/footer";
import Header from "./components/Header/Header";
import ToDoList from "./components/ToDoList/ToDoList"
import  Modal  from "react-modal";
import { useState } from "react";
import './modalStyle.css'
import SingUp from "./components/SignUp/signUp";
Modal.setAppElement('#root')



function App() {
  const [modelIsOpen,setModelIsOpen]= useState(false)
  const handleModal = ()=>{
    setModelIsOpen(!modelIsOpen)
  }


  return (
  <div >
    <Header handleOpenModal={handleModal}/>
    <ToDoList/>
    <Footer/>
    <Modal 
    isOpen={modelIsOpen}
    className="Modal"
    overlayClassName={'Overlay'}>
      <SingUp handleModal={handleModal}/>
    </Modal>
  </div>
  );
}

export default App;
