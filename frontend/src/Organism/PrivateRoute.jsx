import React,{ useEffect, useState } from "react"
// import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({element}) {
    const [data,setData]=useState({fields:[],title:"as",description:"asa"})
    const [url,setUrl]=useState(window.location.pathname)
    const [error, setError] = useState(false);
    async function dataExtraction() {
        try {
            const ext=url.split("/public/")
            const newUrl = "http://localhost:5000/public/" + ext[1]
            console.log(url,newUrl)
            let res = await fetch(newUrl);
            if(res.ok){

                res=await res.json();
                if (res)
                    setData(res.data);
                console.log(data);
            }
            else{
                setError(true)
            }
        }
        catch (e) {
            console.error(e);
           setError(true)
        }

    } useEffect(()=>{
        dataExtraction()
    },[])
    return error ? <Navigate to="/error" /> : React.cloneElement(element,{data:data})
}
export default PrivateRoute;