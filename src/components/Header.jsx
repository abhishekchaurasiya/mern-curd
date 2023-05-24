import React, { useContext } from 'react'
import { AppContext } from '../context/AppContextProvider'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { userUrl } from '../baseUrl';
import { toast } from 'react-hot-toast';
import Products from './Products';

const Header = () => {
    const { loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(AppContext);

    // logout handler of user 
    const logoutHandler = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${userUrl}/logout`, {
                withCredentials: true
            })
            toast.success(response.data.message);
            setIsAuthenticated(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        }
    }

    return (
        
            <div className=' w-full flex justify-evenly items-center bg-slate-900 py-2'>
                <h2 className=' text-white font-bold text-lg'>CRUD Opertion. </h2>
                <div className='flex max-w-[300px] gap-x-6  text-white  text-lg'>
                    <NavLink to="/"> Home</NavLink>
                    {
                        isAuthenticated ?
                            (<button disabled={loading} onClick={logoutHandler}>Logout</button>) :
                            (<NavLink to="/login">Login</NavLink>)
                    }
                </div>
            </div>

    )
}

export default Header

