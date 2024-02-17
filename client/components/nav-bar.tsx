"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "../config/axios";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile]: any = useState(null); //todo fix
  const [load, setLoad] = useState(false)
  const handleFileUpload =  () => {
    try {
      setLoad(true)
      const formData = new FormData();
      formData.append('filename', file);
      console.log(formData);
      
      axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response)=>{
        wait().then(() => setOpen(false));
        toast.success(response.data.message)
        if(response.status === 200){
          setLoad(true)
        }else{
          setLoad(false)
        }
      })
      .catch((error)=>{
        console.error(error);
        setLoad(false)
      })
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };
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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-600 text-white outline-none"
          >
            Upload file
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <Dialog.Description>
              Select the file you want to upload
            </Dialog.Description>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                File
              </Label>
              <Input id="file " required onChange={(event: any) => setFile(event.target.files[0])} type="file" name="filename" />
            </div>
            <Button type="submit" onClick={handleFileUpload} className={`px-3${
                load ? 'cursor-not-allowed ' : ''
              }`} >
              Submit
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button"  variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
        </Dialog.Root>
    </nav>
  );
};

export default NavBar;
