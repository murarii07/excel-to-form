import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useFetchData from "../CustomHooks/useFetchData";
import { useEffect, useState } from "react";

const UserDp = () => {
  const nav = useNavigate();
  
  const logout = async () => {
    try {
      const options = {
        method: "DELETE",
        credentials: "include" // Sends cookies with the request
      }
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/login`, options)
      const response = await res.json();
      if (response.success) {
        window.localStorage.removeItem("isLogged")
        console.log(window.location.pathname)
        if (window.location.pathname === "/") {
          window.location.reload();
        }
        else {
          nav("/", { replace: true });
        }
        return;
      }
      alert("something went wrong try again")
      console.log("something went wrong")
    } catch (e) {
      alert("something went wrong try again")
      console.log("something went wrong")
    }
  }
  
  return (
    <div className="border border-gray-200 rounded-xl w-64 flex flex-col justify-center gap-2 min-h-32 shadow-lg absolute top-12 right-2 bg-white z-50 p-3 backdrop-blur-sm animate-fadeIn">
      <div className="w-full p-1">
        <a 
          href="/my-profile" 
          target="_blank"
          className="block w-full px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white rounded-lg transition-all duration-200 font-medium"
        >
          My Account
        </a>
      </div>
      
      <div className="w-full p-1">
        <a 
          href="/tasks" 
          target="_blank"
          className="block w-full px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white rounded-lg transition-all duration-200 font-medium"
        >
          Tasks
        </a>
      </div>
      
      <div className="w-full p-1 mt-2">
        <Button 
          name="logout" 
          className="w-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white py-2 px-4 font-medium hover:shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200" 
          onClick={() => logout()} 
        />
      </div>
    </div>
  )
}

export default UserDp;