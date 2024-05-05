"use client";
import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import styles from '../auth/styles.module.css';
import Spline from '@splinetool/react-spline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { PdfUpload } from '../apis/common/apis';
import { invoke, askPdf } from '../apis/ai/apis';
import ReactMarkdown from 'react-markdown';
import { TypingEffect } from './typing.effect';


export default function Chat() {
    const [pdf, setPdf] = useState<File | null>(null);
    const [query, setQuery] = useState<string>('');
    const [conversationHistory, setConversationHistory] = useState<any[]>([]);


    const handleFileSelect = (e: any) => {
        const file = e.target.files[0];
        setPdf(file);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const userEntry = { id: conversationHistory.length + 1, username: 'Tom', message: query };
        setConversationHistory(prevHistory => [...prevHistory, userEntry]);
        setQuery('');

        // ask question
        if (!pdf && query) {
            const response = await invoke({ model: "gpt-4-turbo", text: query });
            const responseEntry = { id: conversationHistory.length + 2, username: 'Agent', message: response.response };
            setConversationHistory(prevHistory => [...prevHistory, responseEntry]);
        } else if (pdf && query) {
            await PdfUpload(pdf);
            const response = await askPdf(query);
            const responseEntry = { id: conversationHistory.length + 2, username: 'Agent', message: response.sources[0].page_content };
            setConversationHistory(prevHistory => [...prevHistory, responseEntry]);
        }
    }

    return (
        <div className={`bg-[#000212] ${styles['radient-bg-fill-2']}`}>
            <Navbar />

            <div className={`w-full min-h-screen flex flex-col justify-center items-center p-10 bg-transparent relative`}>

                {conversationHistory.length === 0 ? (
                    <div className='w-full h-full flex flex flex-col justify-center items-center bg-transparent relatve'>
                        {/* static background 3d */}
                        <div className='w-full h-[30rem]'>
                            <Spline scene="https://prod.spline.design/aIEbPZZVOB4Pm0PJ/scene.splinecode" style={{zIndex: -1}} />
                        </div>

                        {/* initial chat input box */}
                        <form onSubmit={handleSubmit} className={`w-3/4 h-[3.5rem] min-w-[25rem] flex flex-row items-center justify-center px-4 gap-2 rounded-lg z-10 ${styles['custom-glass-card']}`}>
                            <AttachFileIcon className="text-white cursor-pointer" onClick={() => {
                                const fileInput = document.getElementById('fileInput');
                                if (fileInput) { fileInput.click();}
                            }} />
                            <input type="file" id="fileInput" className='hidden' onChange={handleFileSelect} />
                            <input 
                                type="text" 
                                placeholder="Message your agent..." 
                                className="input bg-transparent w-full"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <IconButton type="submit">
                                <SendIcon className="text-white" />
                            </IconButton>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className={`w-3/4 h-5/6 min-h-[30rem] min-w-[25rem] min-h-[20rem] items-center justify-center p-6 rounded-lg z-10 bg-transport}`}>

                            {/* chat area */}
                            <div className='h-full w-full overflow-y-auto flex flex-col gap-2 px-2'>
                                {conversationHistory.map((chat, index) => (
                                    <div key={chat.id} className={`chat ${chat.username === 'Agent' ? 'chat-start' : 'chat-end'}`}>
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full bg-white">
                                            </div>
                                        </div>
                                        <div className={`chat-bubble text-base ${chat.username === 'Agent'? 'bg-slate-400 text-black': 'bg-red-300 text-black'}`}>
                                            {chat.username === 'Agent' ? ( <TypingEffect text={chat.message} speed={20} /> ) : ( <ReactMarkdown>{chat.message}</ReactMarkdown> )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* chat input box */}
                        <form onSubmit={handleSubmit} className={`w-3/4 h-[3.5rem] min-w-[25rem] mt-8 flex flex-row items-center justify-center px-4 gap-2 rounded-lg z-10 ${styles['custom-glass-card']}`}>
                            <AttachFileIcon className="text-white cursor-pointer" onClick={() => {
                                const fileInput = document.getElementById('fileInput');
                                if (fileInput) { fileInput.click();}
                            }} />
                            <input type="file" id="fileInput" className='hidden' onChange={handleFileSelect} />
                            <input 
                                type="text" 
                                placeholder="Message your agent..." 
                                className="input bg-transparent w-full"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <IconButton type="submit">
                                <SendIcon className="text-white" />
                            </IconButton>
                        </form>
                    </>
                )}
                
            </div>
        </div>
    )
}