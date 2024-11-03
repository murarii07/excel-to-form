import { useState } from "react";
import { fetchData } from "../fetchData";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
const UserForm=()=>{
    const [fields,setFields]=useState([])
    const [url,setUrl]=useState(window.location.pathname)
    const navigatee= useNavigate();
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
        }
        catch (e) {
            console.error(e);
            navigatee("/error");
        }

    }
    async function dataSubmission(e) {
        try {
            e.preventDefault();
            const ext=url.split("/public/")
            const newUrl = "http://localhost:5000/public/" + ext[1];
            const form = new FormData(e.target);
            const res = await fetchData(newUrl, { method: "POST", body: form });
            if (res.ok) {
                navigatee("/submit");
            }
            console.log(res);
        }
        catch (e) {
            console.error(e);
        }

    }
    useState(()=>{
        dataExtraction()
    },[])
    return(
        <Form field={fields} buttonName={"submit"} formHandles={dataSubmission} />
    )
}
export  default UserForm;