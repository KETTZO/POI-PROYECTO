import React, { useContext } from "react";
import {SocketContext} from '../SocketContext';
import { Link } from "react-router-dom";

const Notifications = () => {
    const {answerCall, call, callAccepted, callEnded} = useContext(SocketContext);

    
    return (
        <div>
        
            {call.isReceivedCall && !callAccepted && (
                    
                        <div>
                            <h1>{call.name} está llamando</h1>
                            <Link to="/videocall"><button onClick={answerCall}> Contestar </button></Link>
                            <button>Rechazar</button>

                        </div>
            )}
        </div>
    )
}

export default Notifications