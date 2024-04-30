"use client";
import styles from '../styles.module.css';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { login, refreshAccessToken } from '../../apis/auth/apis';
import { isTokenExpired } from '../utils';


export default function Login () {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);


    const handleSignin = async () => {
        if (username === '') swal('Error', 'Username cannot be empty', 'error');
        else if (password === '') swal('Error', 'Password cannot be empty', 'error');

        const response = await login({username, password});
        if (rememberMe) localStorage.setItem('remember_me', 'true');
        localStorage.setItem('username', response.username);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        window.location.href = '/chat';
    };

    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    // if remember me is set, try instant login
    useEffect(() => {
        if (localStorage.getItem('remember_me') === 'true') {
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            if (!accessToken || !refreshToken) return;
            if (isTokenExpired(refreshToken)) return;
            if (!isTokenExpired(accessToken)) window.location.href = '/form';
            refreshAccessToken().then((response) => {
                localStorage.setItem('access_token', response.access_token);
                window.location.href = '/form';
            });
        }
    }, []);

    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-6 w-1/3 min-w-[25rem] min-h-[30rem] py-12 px-8 items-center justify-center rounded-lg z-10 ${styles['custom-glass-card']}`}>
                
                {/* image circle */}
                <div className={`rounded-full p-6 items-center justify-center ${styles[`radient-ball`]}`}>
                </div>

                {/* title */}
                <div className='text-2xl font-normal text-white'>Login</div>

                {/* form */}
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input className='grow' type="text" placeholder="Username" color='white' value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input className='grow' type="password" value={password} color='white' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} placeholder="Password" />
                </label>

                {/* remember me */}
                <div className="form-control w-full">
                    <label className="label cursor-pointer flex flex-row gap-2 justify-start bg-transparent">
                        <input type="checkbox" className="checkbox border-gray-600" checked={rememberMe} onChange={handleRememberMeChange}/>
                        <span className="label-text text-gray-300">Remember me</span>
                    </label>
                </div>

                {/* sign in button */}
                <button className="btn btn-wide p-0 border-0 bg-white text-black hover:text-white" onClick={() => handleSignin()}>SIGN IN</button>

                {/* register link */}
                <a href="/auth/register" className="text-sm text-[#DE8286] underline">Dont have an account? Register here</a>

            </div>
        </div>
    );
}