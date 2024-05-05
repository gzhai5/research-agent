"use client";
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


export const TypingEffect = ({ text, speed }: {text: string, speed: number}) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index += 1;
            if (index === text.length) clearInterval(timer);
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};