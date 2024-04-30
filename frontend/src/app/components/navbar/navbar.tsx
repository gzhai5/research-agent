/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };


    // handle cart drawer open/close
    const toggleDrawer = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
        if (drawerCheckbox) {
            drawerCheckbox.checked = !drawerCheckbox.checked;
        }
    };

    return (
        <div className={`navbar bg-transparent`}>

            {/* drawer */}
            <div className="navbar-start">
                <Image src="/agent-logo.png" alt="logo" width={30} height={30} />
                <a className="btn btn-ghost text-2xl text-[#F7F8F8] font-medium">Research Agents</a>
            </div>

            {/* title */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-[#F7F8F8]">
                    <li><a>Lab</a></li>
                    <li><a>Pricing</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>

            {/* profile */}
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-sky-600">
                            <p className="text-white text-xl font-normal text-center mt-[0.3rem]">{username? username.charAt(0).toUpperCase() : "?"}</p>
                        </div>
                    </div>

                    {/* dropdown content */}
                    <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-100 rounded-box w-52 text-[#F7F8F8] bg-transparent`}>
                        {!username ? (
                            <>  
                                <Link href="/auth/login">
                                    <li><a className="text-[#F7F8F8]">Login</a></li>
                                </Link>
                                <Link href="/auth/register">
                                    <li><a className="text-[#F7F8F8]">Register</a></li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <li><a className="text-[#F7F8F8]">Profile</a></li>
                                <li><a className="text-[#F7F8F8]">Settings</a></li>
                                <li><a className="text-[#F7F8F8]" onClick={() => handleLogout()}>Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}