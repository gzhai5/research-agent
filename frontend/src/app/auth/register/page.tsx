"use client";
import React, { useState } from 'react';
import styles from '../styles.module.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import swal from 'sweetalert';
import { register } from '../../apis/auth/apis';


export default function Register () {
    const correctActivationCode = `${process.env.NEXT_PUBLIC_ACTIVATION_CODE}`;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [activationCode, setActivationCode] = useState<string>('');


    const handleSubmit = async () => {
        if (username === '') { swal('Error', 'Username cannot be empty', 'error'); return; }
        else if (password === '') { swal('Error', 'Password cannot be empty', 'error'); return; }
        else if (email === '') { swal('Error', 'Email cannot be empty', 'error'); return; }
        else if (email.split('.')[email.split('.').length - 1] !== 'edu') { swal('Error', 'Please use your university email to prove your researcher identity', 'error'); return; }
        else if (activationCode == '') { swal('Error', 'Activation code cannot be empty', 'error'); return; }
        else if (activationCode !== correctActivationCode) { swal('Error', 'Invalid activation code', 'error'); return; }
        
        const response = await register({username, password, email});
        localStorage.setItem('username', response.username);
        localStorage.setItem('user_id', response.user_id);
        window.location.href = '/auth/login';
    }


    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>
            
            <div className={`flex flex-col gap-6 w-1/3 min-w-[25rem] min-h-[30rem] py-12 px-8 items-center justify-center rounded-lg z-10 ${styles['custom-glass-card']}`}>
                
                {/* image circle */}
                <div className={`rounded-full p-6 items-center justify-center ${styles[`radient-ball`]}`}>
                </div>

                {/* title */}
                <div className='text-2xl font-normal text-white'>Register</div>

                {/* form */}
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="Username" color='white' value={username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" value={password} color='white' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} placeholder="Password" />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="text" className="grow" placeholder="Email" color='white' value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full bg-transparent text-white">
                    <VpnKeyIcon style={{ width: '16px', height: '16px', opacity: 0.7 }}/>
                    <input type="text" className="grow" placeholder="Activation Code" color='white' value={activationCode} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setActivationCode(event.target.value)} />
                </label>


                {/* submit button */}
                <button className="btn btn-wide p-0 border-0 bg-white text-black hover:text-white" onClick={() => handleSubmit()}>SUBMIT</button>

                {/* login link */}
                <a href="/auth/login" className="text-sm text-[#DE8286] underline">Already have an account? Login here</a>

            </div>
        </div>
    );
}