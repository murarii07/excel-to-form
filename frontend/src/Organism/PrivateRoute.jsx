import React,{ useEffect, useState } from "react"
// import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({element}) {
    const [fields,setFields]=useState([])
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
                    setFields(res.data);
                console.log(res.data);
            }
            else{
                setError(true)
            }
        }
        catch (e) {
            console.error(e);
           setError(true)
        }

    } useState(()=>{
        dataExtraction()
    },[])
    return error ? <Navigate to="/error" /> : React.cloneElement(element,{field:fields})
}
export default PrivateRoute;