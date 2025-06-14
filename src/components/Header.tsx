"use client"
import React from 'react'
import { Button } from './Button'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/generate-cv")
  }
  return (
    <header className='p-4 sm:p-9 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='font-fugaz text-xl sm:text-2xl textGradient'>GenCV</h1>
        <Button text='Start generating' onClick={handleRedirect}/>
      </div>
    </header>
  )
}

export default Header
