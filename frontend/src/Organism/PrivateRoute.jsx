import React,{ useEffect, useState } from "react"
// import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";
import useFetchData from "../CustomHooks/fetchData";

function PrivateRoute({element}) {
    const [data,setData]=useState({fields:[],title:"as",description:"asa"})
    const [url]=useState(window.location.pathname)
    const ext=url.split("/public/")
    const newUrl = `http://localhost:5000/public/${ext[1]}`
    const {response,error}=useFetchData(newUrl,{
        method: "GET",  
    })
        //response render
        useEffect(() => {
            if (response && !error) {
                setData(response.data);
                console.log(data);
            }
        }, [response])
    
    return error ? <Navigate to="/error" /> : React.cloneElement(element,{data:data})
}
export default PrivateRoute;