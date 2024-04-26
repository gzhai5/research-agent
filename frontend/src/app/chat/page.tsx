"use client";
import React from 'react';
import Navbar from '../components/navbar/navbar';
import Foobar from '../components/foobar/foobar';


export default function Chat() {
    return (
        <>
            <Navbar />

            <div className="w-full flex flex-col justify-center items-center bg-slate-100 p-20">
                Chat Page
            </div>

            <Foobar />
        </>
    )
}