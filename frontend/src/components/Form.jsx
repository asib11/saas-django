import React, { useState } from 'react';
import api from "../api/api";
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
        try{
            const response = await api.post(route, {userName, password});
            if(method === 'login'){
                localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
                localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
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
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder='User Name'/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your Password'/>
            <button type='submit'>{name}</button>
        </form>
    );
};

export default Form;