"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/nav-bar";
import React from "react";
import axios from "../../../config/axios";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/getfiles")
      .then((response) => {
        console.log(response.data);

        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

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
  return (
    <div>
      <NavBar />
      <section className="bg-black h-screen w-full flex justify-center">
        {data.length !== 0 ? (
          <div className="relative w-10/12 overflow-x-auto shadow-md mb-12">
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
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                      >
                        Delete
                      </a>
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
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
