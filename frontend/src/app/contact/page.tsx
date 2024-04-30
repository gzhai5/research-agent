"use client";
import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import Foobar from '../components/foobar/foobar';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SubjectIcon from '@mui/icons-material/Subject';
import Person4Icon from '@mui/icons-material/Person4';
import EmailIcon from '@mui/icons-material/Email';
import swal from 'sweetalert';
import { sendContactEmail } from './utils';


export default function Contact() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    const handleFormSubmit = async() => {
        if (name === '') { swal('Error', 'Name cannot be empty', 'error'); return; }
        else if (email === '')  { swal('Error', 'Email cannot be empty', 'error'); return; }
        else if (subject === '') { swal('Error', 'Subject cannot be empty, you can write technical, cooperation, or others', 'error'); return; }
        else if (message === '') { swal('Error', 'Message cannot be empty', 'error'); return; }
        const response = await sendContactEmail(name, email, subject, message);
        if (response.success) {
            swal('Success', response.message, 'success');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } else {
            swal('Error', response.message, 'error');
        }
    };


    return (
        <div className='bg-[#000212]'>
            <Navbar />

            <div className={`w-full h-screen flex flex-col gap-2 justify-start items-center p-10 bg-transparent relative`}>
                
                {/* title part */}
                <div className="flex flex-col gap-6 p-20 justify-center items-center ">
                    <p className={`font-normal text-4xl text-center tracking-normal text-[#FFFFFF]`}>Got a question?</p>
                    <p className={`font-normal text-xl text-center tracking-normal text-[#B4BCD0]`}>
                        Keep connection with us about our development progress, <br/> features provided, report bugs, or any other inquiries.
                    </p>
                </div>

                {/* form */}
                <div className='flex flex-col gap-4 border border-[#FFFFFF80] w-1/3 min-w-[30rem] h-3/4 rounded-3xl py-8 px-10 bg-[#000000] items-center'>
                    
                    {/* form title */}
                    <div className='flex flex-row gap-3 items-center jutify-center'>
                        <ContactSupportIcon style={{ fontSize: 40, color: '#FFFFFF' }} />
                        <p className='font-normal text-xl text-white'>Contact Form</p>
                    </div>

                    {/* form inputs: name */}
                    <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                        <Person4Icon style={{ fontSize: 20, color: '#FFFFFF' }} />
                        <input type="text" className="grow truncate" placeholder="name" value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                    </label>

                    {/* form inputs: email */}
                    <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                        <EmailIcon style={{ fontSize: 20, color: '#FFFFFF' }} />
                        <input type="text" className="grow truncate" placeholder="Email" value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
                    </label>

                    {/* form inputs: subject */}
                    <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
                        <SubjectIcon style={{ fontSize: 20, color: '#FFFFFF' }} />
                        <input type="text" className="grow truncate" placeholder="Subject" value={subject} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)} />
                    </label>

                    {/* form inputs: message */}
                    <div className="indicator w-full h-1/2 bg-transparent border-0 rounded-2xl">
                        <div className="indicator-item indicator-bottom">
                            <button type="button" className="btn btn-xs btn-accent" onClick={() => handleFormSubmit()}>Submit</button>
                        </div> 
                        <div className="card border w-full h-full rounded-2xl">
                            <textarea 
                                className="textarea textarea-bordered rounded-2xl border-slate-400 focus:border-slate-400 h-full w-full bg-transparent" 
                                placeholder="Type your messages here..."
                                value={message}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(event.target.value)}
                            ></textarea>
                        </div>
                    </div>


                </div>

            </div>

            <div className='mt-64'><Foobar /></div>
        </div>
    );
}