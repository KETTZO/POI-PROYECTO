
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../SocketContext";
import {db} from "../firebase";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";
import {updateDoc, getDoc } from "firebase/firestore";

import CryptoJS from "crypto-js";

const Chat = (props) => {

    
    const { data } = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext)
    const {me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(SocketContext);
    const myData = "HOLA MUNDO";

    const [user, setUser] = useState([]);
    
    useEffect (() => {
        async function getUser () {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef)
        
            setUser (docSnap.data())
        }
        
        getUser();
    }, []);
    
    const updateEncryption = async () => {

            await updateDoc(doc(db, "users", user.uid), {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                socketId: me,
                uid: user.uid,
                Encrypted: !user.Encrypted
            });
            if(!user.Encrypted)
            {
                console.log("Mensajes desencriptados");
            }
            else{
                console.log("Mensajes encriptados");
            }
            
        
    }

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                <Link to="/videocall" state={myData}><img src={Cam}  alt="" /></Link>
                    <img onClick={updateEncryption} src="https://cdn-icons-png.flaticon.com/512/2433/2433538.png" alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Notifications />
            <Messages/>
            <Input/>
        </div>
    )
}




export default Chat