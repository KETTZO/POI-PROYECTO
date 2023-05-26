import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//import add from "../img/a4.png";
import './Login_Style.css';
import logo3 from '../img/logo3.png'

import {db, storage} from "../firebase";
import { doc, updateDoc} from "firebase/firestore";
const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        //const auth = getAuth();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            

            navigate("/");
        }catch(err){
            setErr(true);
            console.log(err);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <img src={logo3} alt="" />
                <span id='title' className="title">Inicio de sesión</span>
                <form onSubmit={handleSubmit}>
                    <input id="typeEmail" type="email" placeholder="Correo"/>
                    <input id='typePassword' type="password" placeholder="Contraseña"/>
                    <button id='join'>Entrar</button>
                    {err && <span>Pasó algo malo...</span>}
                </form>
                <p>¿No tienes Cuenta? <Link to="/register">Registrate</Link></p>
            </div>
        </div>
    );
};

export default Login;