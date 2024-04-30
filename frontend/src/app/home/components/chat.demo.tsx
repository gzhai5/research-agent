"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function ChatDemoSection() {
    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);


    useEffect(() => {
        const handleScroll = () => {
            const yPos = window.scrollY;
            const triggerYPos = 10;
            if (yPos > triggerYPos) {
                setVideoLoaded(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full h-auto px-40 py-20 items-center">
            <motion.div
                className="border border-solid border-transparent w-full h-[45rem] rounded-xl"
                initial={{ borderColor: 'transparent' }}
                animate={{ borderColor: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)', 'rgba(151, 146, 173, 0.3)', 'rgba(255, 255, 255, 0.05)'] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
            >   
                {!videoLoaded ? (
                    <div className='skeleton w-full h-full'/>
                ) : (
                    <motion.div 
                        className="mockup-browser"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 2 }}
                        transition={{ duration: 5 }}
                    >
                        <div className="mockup-browser-toolbar">
                            <div className="input">https://research-agents.com/chat</div>
                        </div>
                        <video id="videoElement" width="100%" height="80%" autoPlay muted loop className='border-b-xl'>
                            <source src="video-demo.mp4" type="video/mp4"/>
                        </video>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}