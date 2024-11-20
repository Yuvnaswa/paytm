import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate,Link, useNavigate } from "react-router-dom";

export default function Signin(){
    // const [goToDashBoard, setGoToDashBoard] = useState(false);
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate()


    return(
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className='flex justify-center items-center'>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white m-8">
                    Sign In
                </h1>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={e=>{
                            setusername(e.target.value)
                        }}/>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={e =>{
                            setpassword(e.target.value)
                        }}/>
                    </div>
            
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={async() => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard")
                    }}>Sign In</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account? <Link href="#" to={"/signup"} className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sing Up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    )
}