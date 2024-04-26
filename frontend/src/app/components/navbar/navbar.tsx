/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";


export default function Navbar() {
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        setUsername(localStorage.getItem('username') || '');
    }, []);


    // handle cart drawer open/close
    const toggleDrawer = () => {
        const drawerCheckbox = document.getElementById('my-drawer-4') as HTMLInputElement;
        if (drawerCheckbox) {
            drawerCheckbox.checked = !drawerCheckbox.checked;
        }
    };

    return (
        <div className="navbar bg-slate-100">

            {/* drawer */}
            <div className="navbar-start">
                <div className="drawer">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                    {/* drawer title */}
                    <div className="drawer-content">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-black" onClick={toggleDrawer}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                    </div>

                    {/* drawer content disabled */}
                    {/* <div className="drawer-side z-10">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>

            {/* title */}
            <div className="navbar-center">
                <a className="btn btn-ghost text-3xl text-black font-medium">Research Agents</a>
            </div>

            {/* profile */}
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-sky-600">
                            <p className="text-white text-xl font-normal text-center mt-[0.3rem]">{username? username.charAt(0).toUpperCase() : "?"}</p>
                        </div>
                    </div>

                    {/* dropdown content disabled */}
                    {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-100 rounded-box w-52">
                        <li><a className="text-black">Profile</a></li>
                        <li><a className="text-black">Settings</a></li>
                        <li><a className="text-black">Logout</a></li>
                    </ul> */}
                </div>
            </div>
        </div>
    )
}