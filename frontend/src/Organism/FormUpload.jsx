import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useState } from "react";
import Button from "../Atoms/Button";

const FormUpload=(props)=>{
    
    return(
        <>
        {/* <Button name={"upload"} buttonName={`p-1 mt-10 ml-5`} /> */}
        <div className="MainForm border-2 mx-auto  w-10/12 box-border flex flex-col items-center">
        <h1 className="font-bold text-center ">Form TITLE</h1>
        <div className="formDescription ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit reiciendis nisi adipisci porro sint cum reprehenderit animi. Rerum, cumque. Iusto soluta dignissimos, dolorum vel fugit repellendus dolorem nesciunt voluptatibus, totam qui quas voluptatum quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, expedita vel est omnis ea dolore dolorum neque, autem blanditiis, natus maxime modi ut nam tempore optio et quidem iure eos sapiente consequuntur voluptate assumenda.</div>
        <Form field={props.fields} Name={"form1"} />
        </div>
        <footer>footer</footer>
        </>
    );
}
export default FormUpload;