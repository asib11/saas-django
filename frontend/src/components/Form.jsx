import React, { useState } from 'react';
import api from "../api";
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';


const Form = ({route, method}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'login' : 'register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log('[DEBUG] Base URL:', api.defaults.baseURL); 
        try{
            const res = await api.post(route, {userName, password});
            console.log(res);
            if(method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            }else{
                navigate('/login');
            }
        }catch (error){
            console.error(error);
            alert('Something went wrong');
        }finally{
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleSubmit} className=''>
            <h1>{name}</h1>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='User Name'/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter your Password'/>
            <button type='submit'>{name}</button>
        </form>
    );
};

export default Form;

