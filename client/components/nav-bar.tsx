"use client"
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import axios from '../config/axios';
import { toast } from 'sonner';

const NavBar = () => {
    const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      router.push("/login")
    }
  }, [router])

    function handleLogout(): void {
      localStorage.removeItem('token');
      router.push('login')
    }

  return (
    <nav className='bg-black h-20 w-screen flex justify-evenly items-center'>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>
    </nav>
  )
}

export default NavBar