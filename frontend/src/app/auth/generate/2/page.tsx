"use client";
import Link from 'next/link'
import styles from '../../styles.module.css';
import Bubble from './bubble';


const animals = ["Dog", "Rabbit", "Turtle", "Tiger", "Panda", "Penguin", "Bear"];
export default function GenerateTwo() {

    return (
        <div className={`w-full h-screen flex justify-center items-center p-20 bg-[#000212] ${styles['radient-bg-fill']}`}>

            <div className={`flex flex-col gap-8 w-1/2 min-w-[25rem] min-h-[30rem] px-8 py-12 items-center justify-start rounded-lg z-10 ${styles['custom-glass-card']}`}>

                {/* text title */}
                <div className='text-2xl text-center text-white'>Choose your favourite animal</div>

                {/* animal choosing bubbles */}
                <div className='relative w-full py-4 flex flex-col gap-4'>
                    <div className='flex flex-row gap-20 justify-center'>
                        <Bubble name={animals[0]}/>
                        <Bubble name={animals[1]}/>
                    </div>
                    <div className='flex flex-row gap-20 justify-center'>
                        <Bubble name={animals[2]}/>
                        <Bubble name={animals[3]}/>
                        <Bubble name={animals[4]}/>
                    </div>
                    <div className='flex flex-row gap-20 justify-center'>
                        <Bubble name={animals[5]}/>
                        <Bubble name={animals[6]}/>
                    </div>    
                </div>

                {/* button */}
                <Link href='/auth/generate/3'>
                    <button className="btn btn-wide p-0 border-0 bg-green-500 text-black hover:text-white hover:bg-green-950">Next</button>
                </Link>
            </div>
        </div>
    );
}