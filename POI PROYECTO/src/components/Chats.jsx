//import { type } from "@testing-library/user-event/dist/type";
import { QuerySnapshot, doc, onSnapshot} from "firebase/firestore";
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, Timestamp, arrayUnion, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState, useContext, useMemo} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {db, storage} from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { updateCurrentUser } from "firebase/auth";
//import add from "../img/a5.jpg";


const Chats = (props) => {

    const array = [];
    
    
    const [newGroupUsers, setNewGroupUsers] = useState([]);
    
    const isChat = props.isChat;
    const [ text, setText ] = useState("");
    const [ img, setImg ] = useState(null);
    const [newGroup, setNewGroup] = useState (false);
    const [chats, setChats] = useState([])
    const [users, setUsers] = useState([])
    const [userStatus, setuserStatus] = useState(false)
    

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    

    useEffect(()=>{
        const getChats = () =>
        {
            const unsub = onSnapshot (doc(db, "userChats",  currentUser.uid), (doc) => {
                setChats(doc.data())
            });
            

            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats ()
    }, [currentUser.uid]);

    const getAllUsers = async () => {
        try {
            
           const querySnapshot = await getDocs(collection(db, "users"));
           
            querySnapshot.forEach((doc) => {
                
                if(currentUser.uid !== doc.data().uid)
                    array.push(doc.data())
            })
            
            setUsers(array)
        } catch (e) {
            alert(e.message);
        }
    }

    

    if (isChat)
    {
        const handleSelect = (u) => {
            
            if(!u.isGroup)
            {
                dispatch({type:"CHANGE_USER", payload: u})
                
            }
            else
            {
                dispatch({type:"CHANGE_GROUP", payload: u})
                
            }
            
        }
        function test2 () {
            return false;
        }
        function test ()
        {

            console.log(getUserStatus("rAbgzThYdQYfDCVKtbU2mpb5krU2"));
            if(getUserStatus("rAbgzThYdQYfDCVKtbU2mpb5krU2") === false)
            {
                
                console.log("EN LINEA")
            }
            else
                console.log("offline")

        }
        const getUserStatus = async (x) => {
            const q = query(
                collection(db, "users"),
                where ("uid", "==", x)
            );
            
                const querySnapshot = await getDocs(q);
                 
                querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                    setuserStatus(doc.data().isOnline) ;
                });

                console.log(userStatus)
                return userStatus;

        };

        function userClass (x)
        {
            
             return (getUserStatus(x));
            
        }

        const nuevoGrupo = () => {
            newGroupUsers.push(currentUser.uid);
            setNewGroup(true);
            getAllUsers();
        }

        const cancelNuevoGrupo = async () => {
            getAllUsers();
            for (const usuario of users) {

                await updateDoc(doc(db, "users", usuario.uid),{
                    displayName: usuario.displayName,
                    email: usuario.email,
                    photoURL: usuario.photoURL,
                    socketId: usuario.socketId,
                    isIncluded: false,
                    uid: usuario.uid
                });
            }
            
            setNewGroup(false);
            setNewGroupUsers([]);
        }
        const updateisIncluded = async (x) => {
                    
            getAllUsers();
            await updateDoc(doc(db, "users", x.uid), {
                displayName: x.displayName,
                email: x.email,
                photoURL: x.photoURL,
                socketId: x.socketId,
                isIncluded: !x.isIncluded,
                uid: x.uid
            });
            
    }
        const handleSelectNewGroup = (u) => {
                
                const includesUid = newGroupUsers.includes(u.uid);
                const includesCurrentUid = newGroupUsers.includes(currentUser.uid);

                if (!includesCurrentUid)
                {
                    newGroupUsers.push(currentUser.uid);
                }
                //isIncluded(u.uid);
                if (includesUid)
                {
                    const index = newGroupUsers.indexOf(u.uid);
                    if(index > -1)
                    {
                        newGroupUsers.splice(index, 1);
                        
                    } 
                }else {
                    newGroupUsers.push(u.uid);
                    
                }  
                console.log(newGroupUsers);

                updateisIncluded(u);
        }

        if (!newGroup)
        {
            return (
                <div className="chats">
                    <button onClick={nuevoGrupo}>Crear grupo</button>
                    <button onClick={test}>status</button>
                   
                    
                    {Object.entries(chats)?.map((chat) => (
                    
                    <div id={chat[1].userInfo.uid} className={chat[1].userInfo.isOnline  ? 'userChat' : 'userChatOff'} key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                        
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].lastMessage?.text}</p>
                        </div>
                    </div>
                    ))
                       
                    }
                     
                </div>
            )
        }
        else if (newGroup)
        {
            const createNewGroup = async () => {
                
                console.log(newGroupUsers);
                //console.log(e.target[2].files[0]);
                
                try {
                    
                    const storageRef = ref(storage, text);
                    const uploadTask = uploadBytesResumable(storageRef, img);
                    
                    uploadTask.on(
                        
                    (error) => {
                        
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        
                        
                    },
                    () => {
                        
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            
                            const groupID = uuid();
                            await setDoc(doc(db, "chats", groupID), {   messages:   []  }   );
                            for (const usuario of newGroupUsers) {

                                await updateDoc(doc(db, "userChats", usuario),{
                                    [groupID+".userInfo"]:{
                                        uid:groupID,
                                        displayName: text,
                                        photoURL: downloadURL,
                                        isGroup: true
                                    },
                                    [groupID +".date"]: serverTimestamp()
                                });
                            }
                        });
                        }
                    );
                    
                } catch (err){
                    
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                }

                setNewGroup(false);
                for (const usuario of users) {

                    await updateDoc(doc(db, "users", usuario.uid),{
                        displayName: usuario.displayName,
                        email: usuario.email,
                        photoURL: usuario.photoURL,
                        socketId: usuario.socketId,
                        isIncluded: false,
                        uid: usuario.uid
                    });
                }
                
            }

            return (
                
                
                <div className="chats-newGroup">
                    <p>Seleccione integrantes:</p>
                    
                    {Object.entries(users).map((user) => (
                    
                    <div className="userChat" key={user[0]} onClick={() => handleSelectNewGroup(user[1])}>
                        <img className={user[1].isIncluded ? "Check" : "unCheck"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Apple_system_icon_check_mark.svg/1200px-Apple_system_icon_check_mark.svg.png" alt=""/>
                        <img src={user[1].photoURL} alt="" />
                        <div className="userChatInfo">
                            <span>{user[1].displayName}</span>
                            
                        </div>
                    </div>
                    ))}
                    <button onClick={cancelNuevoGrupo}>Cancelar</button>
                    <div className="newGroup">
                        <input placeholder="Nombre del grupo" onChange={e=>setText(e.target.value)}></input>
                        <input type="file" onChange={e=>setImg(e.target.files[0])}></input>
                        <button onClick={createNewGroup}>Continuar</button>
                    </div>
                    
                    
                    
                </div>
            )
        }
    
    }
    
}

export default Chats