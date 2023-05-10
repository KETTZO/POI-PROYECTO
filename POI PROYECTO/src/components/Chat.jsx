
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

const Chat = (props) => {

    
    const { data } = useContext(ChatContext);
    const {currentUser} = useContext(AuthContext)
    const {me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(SocketContext);
    const myData = "HOLA MUNDO";
    
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                <Link to="/videocall" state={myData}><img src={Cam} alt="" /></Link>
                    <img src={Add} alt="" />
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