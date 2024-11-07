import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
import Input from "../Atoms/Input";
const UserForm=({field})=>{
    console.log(field)
    const [fields,setFields]=useState([])
    const [url,setUrl]=useState(window.location.pathname)
    const navigatee= useNavigate();
    useEffect(()=>{
        setFields(field)
    })
   
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
    return(
        <div className="userForm border-2 w-11/12  mt-12 flex">
        {/* <Form
        formClass={"flex gap-10"} 
        field={fields} 
        buttonName={"submit"} 
        formHandles={dataSubmission} /> */}
        <form action="">

           {field.map(
               (x, index) =>
                <div key={x.Id} className="input-preview  flex flex-col bg-purple-200 rounded-xl px-2">
                            <Input
                                className={" border-2 border-black bg-purple-200"}
                                name={x.Name}
                                key={index}
                                id={x.Id}
                                labelName={x.LabelName}
                                type={x.Type}
                                element={
                                    x.isElement && <div className="error">This indicates error</div>} />


                        </div>
                )}
                </form>
        <div>sdsd</div>
        </div>
    )
}
export  default UserForm;