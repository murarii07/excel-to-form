import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";

const FormUpload = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [isEditPara, setIsEditPara] = useState(false);
    const [formDetails, setFormDetails] = useState({ title: "form title", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia praesentium adipisci! Neque, facere nisi quaerat cupiditate architecto harum cumque optio fugiat fugit sint possimus. Officia voluptatum, pariatur amet cupiditate fugiat perspiciatis nulla quod, rerum voluptate dolore saepe eos dolor est recusandae reiciendis odio exercitationem?" }); 
    const fields = useSelector(state => state.Field.value)

    const debounce = (func, timer) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func(...args), timer)
        }
    }

    const formUpload = async () => {
        try {
            setIsEdit(false)
            const formId = prompt("enter unique formName")
            console.log(fields)
            let ob = { fieldDetails: fields, formId: formId, title: formDetails.title, description: formDetails.description }
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
    }, [])

    useEffect(() => {
        const handleClickOutsidee = (e) => {
            if (e.target.classList.contains("changeAbleLabelName")) {
                // console.log(e.target.classList.contains("changeAbleLabelName"))

                if (e.key === "Enter") {
                    setIsEdit(false)
                    return
                }
            }
            if (e.target.classList.contains("changeAbleLabelNamePara")) {
                if (e.key === "Enter") {
                    setIsEditPara(false)
                }
            }

        };

        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("key", handleClickOutsidee);
        };
    }, [isEdit]);
    const handleTitle=debounce((e) => {
        console.log(e.target.value)
        setFormDetails({ ...formDetails, title: e.target.value })
    },500)
    const handleDescription=debounce((e) => {
        console.log(e.target.value)
        setFormDetails({ ...formDetails, description: e.target.value })
    },500)
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
                <h1 className="font-bold text-center text-2xl p-2 ">
                    {isEdit ?
                        <InputField placeholder={formDetails.title} className="outline-none bg-transparent changeAbleLabelName" onChange={handleTitle} />
                        :
                        <Label labelname={formDetails.title} onDoubleClick={
                            () => {
                                setIsEdit(true)
                            }
                        } />}</h1>

                <div className="formDescription  text-center "    >
                {isEditPara ?
                        <InputField placeholder={formDetails.description} type="textarea" className="outline-none bg-transparent changeAbleLabelNamePara" onChange={handleDescription} />
                        :
                        <Label labelname={formDetails.description} onDoubleClick={
                            () => {
                                setIsEditPara(true)
                            }
                        } />}
                    
                    </div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"}  formClass="pt-5 bg-teal-50 border-2 border-gray-200 pb-10" >

                </ Form >
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;