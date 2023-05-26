import React, { useContext, useState } from "react";
import {SocketContext} from '../SocketContext';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, getDoc } from "firebase/firestore";
import {db} from "../firebase";


const Options = ({children}) => {
    
    
    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    
    
    const {me, callAccepted, name, setName, callEnded, leaveCall, callUser} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    async function getSocketId ()  {
        const docRef = doc(db, "users", data.user.uid);
        const docSnap = await getDoc(docRef);
        
        console.log(docSnap.data().socketId);
        setIdToCall(docSnap.data().socketId);
        console.log(currentUser);
        
    }

    window.onload = getSocketId();

    return (
        <div>
            {
                callAccepted && !callEnded ? (
                    <button onClick={leaveCall}>Colgar</button>
                ) : (
                    <button onClick={() => callUser(idToCall)}>
                        Llamar
                    </button>
                    

                )
            }
            {children}
            
        </div>

    )
}

export default Options