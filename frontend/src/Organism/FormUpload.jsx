import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";

const FormUpload = () => {
    const navigate=useNavigate()
    const [error,setError]=useState(false)
    const [isEdit, setIsEdit] = useState(true);
    const [formDetails, setFormDetails] = useState({title:"form title",description:"lorem 45"});
    const fields = useSelector(state => state.Field.value)
    const formUpload = async () => {
        try {
            setIsEdit(false)
            const formId = prompt("enter unique formName")
            console.log(fields)
            let ob = { fieldDetails: fields, formId: formId,title:formDetails.title,description:formDetails.description }
            console.log(ob)
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }, body: JSON.stringify(ob)
            }
            const result = await fetchData('http://localhost:5000/user/upload', options)

            if (result.success) {
                console.log(result.data.url)
                navigate(`/public/${result.data.url}`)
                
            }
            else {
                throw new Error("error");

            }
        } catch (e) {
            alert("something went wrong")
            console.log(e)
            setError(true)
        }
    }

    useEffect(() => {
        console.log(fields)
    })
    if (error) {
        console.log(error)
        return <Navigate to="/error" />
    }
    return (
        <>
        {/* <Nav flag={true} />? */}
            <div className="upload-button  w-full  mt-5 flex justify-center mb-5">

                <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={formUpload} />
            </div>
            <div className="MainForm
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                <h1 contentEditable={isEdit} className="font-bold text-center text-2xl p-2 ">{formDetails.title}</h1>
                <div className="formDescription  text-center " contentEditable={isEdit}   >{formDetails.description}</div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} >

                </ Form>
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;