import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";

const FormUpload = (props) => {
    const fields = useSelector(state => state.Field.value)
    const fetchData = async () => {
        try {
            let ob = { fieldDetails: fields, formId: "ajayx" }
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
            <Button name={"upload"} buttonName={`p-1 mt-5 mb-10 flex justify-center bg-purple-600 border-purple-600 text-white font-bold`} onClick={fetchData} />
            <div className="MainForm border-2 mx-auto  w-10/12 box-border flex flex-col gap-10">
                <h1 className="font-bold text-center ">Form TITLE</h1>
                <div className="formDescription mb-10 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit reiciendis nisi adipisci porro sint cum reprehenderit animi. Rerum, cumque. Iusto soluta dignissimos, dolorum vel fugit repellendus dolorem nesciunt voluptatibus, totam qui quas voluptatum quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, expedita vel est omnis ea dolore dolorum neque, autem blanditiis, natus maxime modi ut nam tempore optio et quidem iure eos sapiente consequuntur voluptate assumenda.</div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} />
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;