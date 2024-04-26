"use client";
import React from 'react';
import Link from 'next/link'
import styles from '../../styles.module.css';


export default function GenerateTwo() {
    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-8 w-2/3 min-w-[25rem] min-h-[30rem] px-8 py-12 items-center justify-start rounded-lg z-10 ${styles['custom-glass-card']}`}>

                {/* text title */}
                <div className='text-2xl text-center text-white'>Choose your favourite animal</div>

                {/* animal choosing bubbles */}
                <div></div>

                {/* button */}
                <Link href='/auth/generate/3'>
                    <button className="btn btn-wide p-0 border-0 mt-10 bg-cyan-500 text-black hover:text-white hover:bg-cyan-950">Next</button>
                </Link>
            </div>
        </div>
    );
}