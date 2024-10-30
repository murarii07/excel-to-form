import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";

const FormUpload = () => {
    const fields = useSelector(state => state.Field.value)
    const fetchData = async () => {
        try {
            const formId=prompt("enter unique formName")
            let ob = { fieldDetails: fields, formId:formId}
            console.log(ob)
            const response = await fetch('http://localhost:5000/user/upload', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }, body: JSON.stringify(ob)
            });
            const r = await response.json()
            if (r.success) {
                console.log(r)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        console.log(fields)
    })

    return (
        <>
        <div className="upload-button  w-full  mt-5 flex justify-center mb-5">

            <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={fetchData} />
        </div>
            <div className="MainForm
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                <h1 contentEditable="true" className="font-bold text-center border-2 p-2 ">Form TITLE</h1>
                <div className="formDescription  text-center " contentEditable="true"    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit reiciendis nisi adipisci porro sint cum reprehenderit animi. Rerum, cumque. Iusto soluta dignissimos, dolorum vel fugit repellendus dolorem nesciunt voluptatibus, totam qui quas voluptatum quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, expedita vel est omnis ea dolore dolorum neque, autem blanditiis, natus maxime modi ut nam tempore optio et quidem iure eos sapiente consequuntur voluptate assumenda.</div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} >
                    
                    </ Form>
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;