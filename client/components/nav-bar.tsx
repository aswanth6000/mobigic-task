"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";



const NavBar = () => {


  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  function handleLogout(): void {
    localStorage.removeItem("token");
    router.push("login");
  }

  return (
    <nav className="bg-black h-20 w-full flex  justify-evenly items-center">
      <Button
        variant="outline"
        className="bg-red-600 text-white outline-none"
        onClick={handleLogout}
      >
        Log Out
      </Button>
      
    </nav>
  );
};

export default NavBar;
