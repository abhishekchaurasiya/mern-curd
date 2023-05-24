import React, { useContext, useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { userUrl } from '../baseUrl';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast';
import { AppContext } from '../context/AppContextProvider';

const Register = () => {
    const { loading, setLoading, isAuthenticated, setIsAuthenticated, showPassword, setShowPassword } = useContext(AppContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const submitHandler = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const response = await axios.post(`${userUrl}/signup`, {
                name, email, password, phoneNumber
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            console.log(response.data)
            toast.success(response.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to="/" />

    return (
        <div className='flex items-center justify-center w-[500px] h-[80vh] m-auto '>
            <section className='shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] py-5 px-14 rounded-md'>
                <form className=' flex flex-col items-center gap-y-1' onSubmit={submitHandler}>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Name<sup className='text-red-500'>*</sup>
                        </p>
                        <input
                            type="text"
                            placeholder='Enter your name...'
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className=" bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2"
                        />
                    </label>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Email<sup className='text-red-500'>*</sup></p>
                        <input
                            type="email"
                            placeholder='Enter your email...'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}

                            className=" bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2"
                        />
                    </label>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Password<sup className='text-red-500'>*</sup></p>
                        <div className='flex items-center'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Enter your password...'
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="relative bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2"
                            />
                            <div className='w-[100px] fixed left-[58%] right-[30%]'>
                                <span className='text-black'
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? (<AiFillEye />) : (<AiFillEyeInvisible />)
                                    }
                                </span>
                            </div>
                        </div>
                    </label>
                    <label>
                        <p className='text-gray-700 font-bold text-[18px] py-1 hover:animate-bounce hover:text-red-950 transition delay-300 ease-in w-20'>
                            Mobile<sup className='text-red-500'>*</sup></p>
                        <div className='flex items-center'>
                            <input
                                type="tel"
                                placeholder='Enter your phone number...'
                                required
                                value={phoneNumber}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                className="relative bg-blue-950 text-white rounded-md outline-none border-2 border-black p-1 w-[300px] px-2"
                            />
                        </div>
                    </label>
                    <div>
                        <button disabled={loading}
                            className='bg-blue-950 py-1 px-10 rounded-full mt-2 text-slate-100 font-semibold'
                            type='submit'>Sign up</button>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div className='w-[40px] h-0 border-blue-950 border border-y-[1px]'></div>
                        <h4 className='text-[10px] font-semibold'>Or</h4>
                        <div className='w-[40px] h-0 border-blue-950 border border-y-[1px]'></div>
                    </div>

                    <div>
                        <p className='bg-blue-950 py-1 px-10 rounded-full mt-1 text-slate-100 font-semibold'>
                            <NavLink to="/login">Login</NavLink>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register
