import React from 'react'
import { Button } from './ui/button'

const NavBar = () => {
    function handleLogout(event): void {
        localStorage.clear("token")
    }

  return (
    <nav className='bg-black h-20 w-screen flex justify-evenly items-center'>
        <Button variant="outline" onClick={handleLogout}>Log Out</Button>

    </nav>
  )
}

export default NavBar