import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CustomToastContainer = () => {
  return (
    <ToastContainer
  position="top-right"
  autoClose={1500}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnHover
  transition={Slide}
  theme="light"
  closeButton={false} 
  className="rounded-lg drop-shadow-md"
  toastClassName={() =>
    "relative flex p-3 rounded-lg bg-white text-gray-800 shadow-md border border-gray-200 font-medium text-sm sm:text-base"
  }
  bodyClassName="flex items-center"
  progressClassName="bg-green-500 h-1 rounded-full"
/>

  );
};

export default CustomToastContainer;
