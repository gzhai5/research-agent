"use client";
import React from 'react';
import Link from 'next/link'
import styles from '../../styles.module.css';
import { WavingBall } from '@/app/components/ball/ball';


export default function GenerateOne() {
    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-8 w-1/3 min-w-[25rem] min-h-[30rem] px-8 py-12 items-center justify-start rounded-lg z-10 ${styles['custom-glass-card']}`}>

                {/* image circle */}
                <WavingBall />

                {/* text title */}
                <div className='text-2xl text-center text-white'>Welcome to <br/> the Research Agents</div>

                {/* text description */}
                <div className='text-base text-center text-slate-300 mt-2 px-2'>Welcome to our app! To create a personalized research companion just for you, we&apos;ll ask a few questions. Let&apos;s get started!.</div>

                {/* button */}
                <Link href='/auth/generate/2'>
                    <button className="btn btn-wide p-0 border-0 mt-10 bg-cyan-500 text-black hover:text-white hover:bg-cyan-950">Next</button>
                </Link>
            </div>
        </div>
    );
}