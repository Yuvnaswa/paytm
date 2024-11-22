import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useNavigationType } from 'react-router-dom'
import axios from "axios";
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { Inputbox } from '../components/Inputbox';
import { Button } from '../components/Buttons';
import { ButtonWarning } from '../components/ButtonWarning';

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName]  = useState("");
    const [lastName, setLastName]  = useState("");
    const [username, setUsername]  = useState("");
    const [password, setPassword]  = useState("");



   return (
    <div className='bg-slate-300 w-full h-screen flex justify-center'>
        <div className='flex justify-center flex-col '>
            <div className='w-80 bg-slate-100 text-center p-2 h-max rounded-lg px-2'>
                <Heading label={"Sign Up"} />
                <Subheading label={"Enter your information to create an account"}/>
                <Inputbox onChange={e => setFirstName(e.target.value)} label={"Firstmame"} placeholder={"Firstname"}/>
                <Inputbox onChange={e => setLastName(e.target.value)} label={"Lastname"} placeholder={"Lastname"}/>
                <Inputbox onChange={e => setUsername(e.target.value)} label={"Email"} placeholder={"email@gmail.com"}/>
                <Inputbox onChange={e => setPassword(e.target.value)} label={"Password"} placeholder={"Password"}/>
                <div className='pt-6'>
                    <Button label={"Sign Up"} onClick={async() => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            firstName,
                            lastName,
                            username,
                            password
                        })
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard")
                        }} />
                </div>
                <ButtonWarning label={"Already have an accoutn?"} buttonText={"Sing In"} to={"/signin"} />
                
            </div>
        </div>
       
    </div>
   )
}

export default Signup