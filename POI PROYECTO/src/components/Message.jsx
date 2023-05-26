import React, { useContext, useEffect, useRef, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, getDoc } from "firebase/firestore";
//import add from "../img/a5.jpg";
import {db} from "../firebase";
import CryptoJS from "crypto-js";



const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const [user, setUser] = useState([]);
    
    useEffect (() => {
        async function getUser () {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef)
        
            setUser (docSnap.data())
        }
        
        getUser();
    }, []);
    

    
    const descifrar = (texto) => {
        var bytes = CryptoJS.AES.decrypt(texto, '@POI-002');
        var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
        return textoDescifrado;
    }

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
       

    }, [message]);
    
    
    
    var currentTimestamp = Date.now()
    var date = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(message.date.toDate())
    var today = new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(currentTimestamp)
    let date1 = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(message.date.toDate())
    //var timestemp = new Date( 1665620418 );
    //var formatted = timestemp.format("dd/mm/yyyy hh:MM:ss");
    
    //const today = new Date();
    if (today === date) {
         //console.log(1);
         date = 'HOY';
    }
    if (user.Encrypted)
    {
        return (

        
            <div 
                ref={ref}
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
            >
                <div className="messageInfo">
                    <img src={
                        message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : message.userPhotoURL
                    } 
                    alt="" />
                        <p>{date}</p>
                        <p>{date1}</p>
                    </div>
                <div className="messageContent">
                    <p href="Map" target="_blank">{message.text
                        ? descifrar(message.text)
                        : message.img 
                            ?
                            <img src={message.img} alt="" /> 
                            : message.file
                        }
                        </p>
                </div>
            </div>
        ) 
    }
    else if (!currentUser.Encrypted)
    {
        return (

        
            <div 
                ref={ref}
                className={`message ${message.senderId === currentUser.uid && "owner"}`}
            >
                <div className="messageInfo">
                    <img src={
                        message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : message.userPhotoURL
                    } 
                    alt="" />
                        <p>{date}</p>
                        <p>{date1}</p>
                    </div>
                <div className="messageContent">
                    <p>{message.text
                        ? message.text
                        : message.img 
                            ?
                            <img src={message.img} alt="" /> 
                            : message.file
                        }
                        </p>
                </div>
            </div>
        ) 
    }
        
}

export default Message