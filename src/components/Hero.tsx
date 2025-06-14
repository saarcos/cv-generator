"use client"
import React from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'
export default function Hero() {
    const router = useRouter();
    const handleRedirect = () => {
        router.push("/generate-cv")
    }
    return (
        <div className='sm:py-14 md:py-20 text-center flex flex-col gap-2'>
            <h1 className='font-fugaz text-5xl sm:text-6xl md:text-7xl leading-snug'>
                <span className='textGradient'>GenCV</span> allows you to create your <span className='textGradient'>ideal</span> resume using AI for <span className='textGradient'></span>
            </h1>
            <p className='mt-6 text-lg sm:text-xl text-gray-600 w-full max-w-[600px] mx-auto'>
                Just input your details and let our AI enhance, structure, and design your CV to <span className='font-semibold'>stand out from the crowd!</span>
            </p>
            <div className='flex items-center justify-center mt-5'>
                <Button text='Start generating' onClick={handleRedirect} />
            </div>
        </div>
    )
}
