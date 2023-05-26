import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Menu from "../components/Menu";
import VideoPlayer from "../components/VideoPlayer";
import Options from "../components/Options";
import Notifications from "../components/Notifications";
import { SocketContext } from "../SocketContext";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


const Home = () => {

    const { data } = useContext(ChatContext);
    const {me} = useContext(SocketContext);
    const {currentUser} = useContext(AuthContext);
    const [idToCall, setIdToCall] = useState('');

    const updateSocket = async () => {
        
        console.log(me);
        if(currentUser != null)
        {
            await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                socketId: me,
                uid: currentUser.uid
            });
            console.log("USUARIO EXISTENTE");
        }
    }

    window.onload = updateSocket();
    

    return (
        <div className="home">
            <div className="container">
                
                {/*<VideoPlayer/>
                <Options>
                    <Notifications />
                 </Options>
                 */}
                
                
                 <Menu />
                <Sidebar/>
                <Chat/>
                
                
                
            </div>
        </div>
    )
}

export default Home