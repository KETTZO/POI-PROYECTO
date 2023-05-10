import React, { useContext } from 'react'

import { SocketContext } from '../SocketContext'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const VideoPlayer = () => {
    const {me, name, setName,  callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(SocketContext);

    const {Chat} = useContext(ChatContext)
    const {currentUser} = useContext(AuthContext);
    setName(currentUser.displayName);
    
    return (
        <div className='container-videos'>
           
            <div className='myVideo'>
                <p>{name}</p>
                {/*Nuestro video*/ }
                { stream && (
                    
                    <video playsInline muted ref={myVideo} autoPlay className='video'/>              
                )}
                
            </div>
            <div className='userVideo'>
                    {/*Usuario video*/ }
                {call.name}
                { callAccepted && !callEnded && (
                        
                    <video playsInline muted ref={userVideo} autoPlay className='video'/>
                )}
            </div>
        </div>

    )

}

export default VideoPlayer