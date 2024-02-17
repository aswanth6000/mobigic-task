"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

const NavBar = () => {
    const router = useRouter()
    function handleLogout(): void {
        localStorage.removeItem('token');
        router.push('/login')
    }

  return (
    <nav className='bg-black h-20 w-screen flex justify-evenly items-center'>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
    </nav>
  )
}

export default NavBar