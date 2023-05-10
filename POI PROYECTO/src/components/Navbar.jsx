import React, { useContext } from "react";
//import add from "../img/a5.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";
import { SocketContext } from "../SocketContext";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const {me} = useContext(SocketContext);
    

    
    return (
        <div className="navbar">
            <span className="logo">Work School</span>
            {me}
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Salir</button>
            </div>
        </div>
    )
}

export default Navbar