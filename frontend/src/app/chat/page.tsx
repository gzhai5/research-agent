"use client";
import React from 'react';
import Navbar from '../components/navbar/navbar';
import styles from '../auth/styles.module.css';
import Spline from '@splinetool/react-spline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';


const exampleConversationHistory = [
    { id: 1, username: 'Agent', message: "It was said that you would, destroy the Sith, not join them." },
    { id: 2, username: 'Tom', message: "It was you who would bring balance to the Force" },
    { id: 3, username: 'Agent', message: "Not leave it in Darkness" },
    { id: 4, username: 'Tom', message: "I hate you!" },
    { id: 5, username: 'Agent', message: "Liar!" },
    { id: 6, username: 'Tom', message: "You're with him! You brought him here to kill me!" },
    { id: 7, username: 'Agent', message: "No!" },
    { id: 8, username: 'Tom', message: "Let her go, Anakin!" },
    { id: 9, username: 'Agent', message: "Anakin, Anakin, Anakin!" },
    { id: 10, username: 'Tom', message: "You turned her against me!" },
];


export default function Chat() {
    const handleFileSelect = (e: any) => {
        const file = e.target.files[0];
        console.log(file);
    }



    return (
        <div className={`bg-[#000212] ${styles['radient-bg-fill-2']}`}>
            <Navbar />

            <div className={`w-full min-h-screen flex flex-col justify-center items-center p-10 bg-transparent relative`}>

                {/* static background 3d */}
                <div className='w-full h-[30rem]'>
                    <Spline scene="https://prod.spline.design/aIEbPZZVOB4Pm0PJ/scene.splinecode" style={{zIndex: -1}} />
                </div>

                {/* initial chat */}
                <div className={`w-2/4 h-[4rem] min-w-[25rem] flex flex-row items-center justify-center px-4 gap-2 rounded-lg z-10 ${styles['custom-glass-card']}`}>
                    <AttachFileIcon className="text-white cursor-pointer" onClick={() => {
                        const fileInput = document.getElementById('fileInput');
                        if (fileInput) { fileInput.click();}
                    }} />
                    <input type="file" id="fileInput" className='hidden' onChange={handleFileSelect} />
                    <input type="text" placeholder="Message your Agent..." className="input bg-transparent w-full" />
                    <IconButton>
                        <SendIcon className="text-white" />
                    </IconButton>
                </div>

                {/* chat history */}
                <div className={`w-3/4 h-[30rem] min-w-[25rem] min-h-[20rem] items-center justify-center p-6 rounded-lg z-10 ${styles['custom-glass-card']} hidden`}>

                    {/* chat area */}
                    <div className='h-full w-full overflow-y-auto flex flex-col'>
                        {exampleConversationHistory.map((chat, index) => (
                            <div key={chat.id} className={`chat ${chat.username === 'Agent' ? 'chat-start' : 'chat-end'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full bg-white">
                                    </div>
                                </div>
                                <div className="chat-bubble">{chat.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    )
}