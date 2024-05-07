"use client";
import React, { useState } from 'react';
import styles from '../styles.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';


export default function HeroSection() {
    const version = `${process.env.NEXT_PUBLIC_VERSION}`;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('username') ? true : false);


    return (
        <motion.div 
            className="flex flex-col gap-6 w-full px-20 py-20 items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.25, duration: 1 }}>

            {/* version info */}
            <div className="flex bg-[#FFFFFF]/[0.1] py-1.5 px-3 rounded-xl justify-center items-center">
                <p className="text-[#F7F8F8] font-normal text-sm">Research Agents v{version}</p>
            </div>

            {/* website big tagline */}
            <div className="flex justify-center items-center">
                <p className={`font-medium text-7xl text-center tracking-tight ${styles['gradient-big-tagline']}`}>
                    Research agents: best AI-Powered research companion
                </p>
            </div>

            {/* website small tagline */}
            <div className="flex justify-center items-center">
                <p className={`font-normal text-xl text-center tracking-normal text-[#B4BCD0]`}>
                    Unleash the future of research. <br/> Let generative agents revolutionize your work.
                </p>
            </div>

            {/* get started button */}
            <Link href={isLoggedIn ? '/chat' : '/auth/login'}>
                <button className='flex flex-row gap-1 justify-center items-center bg-[#5E6AD2] px-5 py-3 rounded-xl hover:bg-[#6775eb] transform transition-transform duration-300 active:scale-90 focus:outline-none'>
                    <p className="text-[#F7F8F8] font-medium text-base">Get Started</p>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="#F7F8F8" role="img" focusable="false" aria-hidden="true"><path d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z"></path></svg>
                </button>
            </Link>

        </motion.div>
    );
}