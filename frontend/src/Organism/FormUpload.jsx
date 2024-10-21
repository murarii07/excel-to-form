import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useState } from "react";

const FormUpload=()=>{
    const fields = useSelector((state) => state.Field.value);
    useState(()=>{
        console.log(fields)
    })
    return(

        <Form field={fields} Name={"form1"} />
    );
}
export default FormUpload;