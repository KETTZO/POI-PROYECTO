import VideoPlayer from "../components/VideoPlayer";
import Options from "../components/Options";
import Notifications from "../components/Notifications";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation} from "react-router-dom";

const VideoCall = (props) => {

    
    const { data } = useContext(ChatContext);
    const {me} = useContext(SocketContext);
    const {currentUser} = useContext(AuthContext);
        
    const [idToCall, setIdToCall] = useState('');

    async function getSocketId ()  {
        if(data.user != null)
        {
            const docRef = doc(db, "users", data.user.uid);
            const docSnap = await getDoc(docRef);
            setIdToCall(docSnap.data().socketId);
        }

    }

    window.onload = getSocketId();




    const updateSocket = async () => {
        if(currentUser != null)
        {
            await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
                socketId: me,
                uid: currentUser.uid
            });
            console.log(currentUser);
            
        }
    }
    
    window.onload = updateSocket();
    
    return (
        <div className="home">
            <div className="container">
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
                
            </div>
        </div>
    )
}

export default VideoCall 