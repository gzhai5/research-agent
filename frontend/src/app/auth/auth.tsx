"use client";
import Login from "./login/page";
import Register from "./register/page";


export default function Auth({ status } : { status: string }) {
    return (
        <div className="w-full h-screen flex justify-center items-center p-20">
            {status === "login" ? 
                <Login /> : <Register />
            }
        </div>
    );
}