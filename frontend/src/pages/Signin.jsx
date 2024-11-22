import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate,Link, useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import {Subheading} from '../components/Subheading'
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Buttons";
import { ButtonWarning } from "../components/ButtonWarning";

export default function Signin(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
   
    
    return(
        <div className='bg-slate-300 w-full h-screen flex justify-center'>
        <div className='flex justify-center flex-col '>
            <div className='w-80 bg-slate-100 text-center p-2 h-max rounded-lg px-2'>
                <Heading label={"Sign In"} />
                <Subheading label={"Enter your credentials to access your account"}/>
                <Inputbox onChange={e => setUsername(e.target.value)} label={"Email"} placeholder={"email@gmail.com"}/>
                <Inputbox onChange={e => setPassword(e.target.value)} label={"Password"} placeholder={"Password"}/>
                <div className='pt-6'>
                    <Button label={"Sign In"} onClick={async() => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                            username,
                            password
                        })
                        localStorage.setItem("token", res.data.token)
                        navigate("/dashboard")
                        }} />
                </div>
                <ButtonWarning  label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                
            </div>
        </div>
       
    </div>
    )
}