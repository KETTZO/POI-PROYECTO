import React, { useState } from "react";
import add from "../img/a4.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './Register_Style.css';
import logo3 from '../img/logo3.png'
import logo4 from '../img/logo4.png'


const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;    
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res  = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(

            (error) => {
                setErr(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                
            },
            () => {
                
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user, {
                    displayName,
                    photoURL:downloadURL,
                });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL:downloadURL,
                    });

                    await setDoc (doc(db, "userChats", res.user.uid), {});
                    navigate("/")
                });
            }
            );
            
        } catch (err){
            setErr(true);
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
        
        


    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <img src={logo3} alt="" />
                <span id="title" className="title">Registro</span>
                <form onSubmit={handleSubmit}>
                    <input id="name" type="text" placeholder="Nombre"/>
                    <input id="correo" type="email" placeholder="Correo"/>
                    <input id="contra" type="password" placeholder="Contraseña"/>
                    <input style={{display: "none"}} type="file" id="File"/>
                    <label  htmlFor="File">  
                        <img id="logo" src={logo4} alt="" />
                        <span id='foto'>Agregar foto</span>
                    </label>
                    <select id="carrera">
                        <option disabled selected value="">Seleccione una carrera</option>
                        <option value="">LMAD</option>
                        <option value="">LCC</option>
                        <option value="">LM</option>
                        <option value="">LSTI</option>
                        <option value="">LF</option>
                    </select>
                    <button id="join">Registrarse</button>
                    {err && <span>Ocurrió un error...</span>}
                </form>
                <p>¿Ya tienes Cuenta? <Link to="/login">Ingresar</Link></p>
            </div>
        </div>
    )
}

export default Register