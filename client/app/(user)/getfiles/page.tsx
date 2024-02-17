"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
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
import * as Dialog from "@radix-ui/react-dialog";

import axios from "../../../config/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const Page = () => {
  const [code, setCode] = useState("");
  const [openCode, setOpenCode] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [file, setFile]: any = useState(null); //todo fix
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [codeErr, setCodeErr] = useState("");

  const handleFileUpload = () => {
    try {
      setLoad(true);
      const formData = new FormData();
      formData.append("filename", file);
      axios
        .post("http://localhost:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          wait().then(() => setOpen(false));
          toast.success(response.data.message);
          if (response.status === 200) {
            setRefresh(true);
            setLoad(false);
          } else {
            setLoad(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoad(false);
        });
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`/getfiles`)
      .then((response) => {
        setData(response.data);
        setRefresh(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  function formatDate(date: Date) {
    const options: any = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  function formatTime(date: Date) {
    const options: any = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(date).toLocaleTimeString("en-US", options);
  }

  const handleDownload = () => {
    axios
      .get(`http://localhost:8000/downloadfile/${code}`, {
        responseType: "blob",
      })
      .then((response) => {        
        if (response.status === 200) {
          wait().then(() => setOpenCode(false));
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.jpg");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }else{
          setCodeErr("Invalid code!!");
        }
      })
      .catch((error) => {
        setCodeErr("Invalid code!!");
        console.log(error.response);
      });
  };

  const handleDelete = (uniqueCode: string): void => {
    setRefresh(true);
    axios
      .delete("http://localhost:8000/deletefile", {
        data: { fileId: uniqueCode },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRefresh(false);
        toast.success(response.data.message);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <section className="bg-black h-screen w-full flex p-2 flex-col items-center">
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
              <DialogTitle>Upload file</DialogTitle>
              <Dialog.Description>
                Select the file you want to upload
              </Dialog.Description>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  File
                </Label>
                <Input
                  id="file "
                  required
                  onChange={(event: any) => setFile(event.target.files[0])}
                  type="file"
                  name="filename"
                  accept=".jpg"
                />
              </div>
              <Button
                type="submit"
                onClick={handleFileUpload}
                className={`px-3${load ? "cursor-not-allowed " : ""}`}
              >
                Submit
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog.Root>
        {data.length ? (
          <div className="relative w-10/12 overflow-x-auto shadow-md mt-4 mb-12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    File name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.filename}
                    </th>
                    <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
                    <td className="px-6 py-4">{formatTime(item.createdAt)}</td>
                    <td className="px-6 py-4">{item.uniqueCode}</td>
                    <td className="px-6 py-4 ">
                      <Dialog.Root open={openCode} onOpenChange={setOpenCode}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-green-600 text-white outline-none"
                          >
                            Download
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Download file</DialogTitle>
                            <Dialog.Description>
                              Enter the code to Download the file
                            </Dialog.Description>
                            {codeErr && (
                              <Dialog.Description className="text-red-600">
                                {codeErr}
                              </Dialog.Description>
                            )}
                          </DialogHeader>
                          <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                              <Label htmlFor="link" className="sr-only">
                                Code
                              </Label>
                              <Input
                                id="text"
                                maxLength={6}
                                required
                                onChange={(event: any) =>
                                  setCode(event.target.value)
                                }
                                type="text"
                                name="uniqueCode"
                              />
                            </div>
                            <Button
                              type="submit"
                              onClick={handleDownload}
                              className={`px-3${
                                load ? "cursor-not-allowed " : ""
                              }`}
                            >
                              Submit
                            </Button>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog.Root>
                      <Button
                        className="font-medium ml-2 text-white bg-red-500 hover:bg-white hover:text-black"
                        onClick={() => handleDelete(item.uniqueCode)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col w-full  items-center">
            <div className="text-4xl font-bold text-white">Add some Files</div>
          </div>
        )}
        {load && (
          <div className="flex flex-col w-full  items-center">
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
            <Skeleton className=" w-10/12 px-6 mb-4 py-3 h-12" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
