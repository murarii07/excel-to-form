import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import {Navigate, useNavigate } from "react-router-dom";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/fetchData";

const FormUpload = () => {
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState({isEditTitle:false,isEditDes:false});
    const [formDetails, setFormDetails] = useState({
         title: "form title", 
         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia praesentium adipisci! Neque, facere nisi quaerat cupiditate architecto harum cumque optio fugiat fugit sint possimus. Officia voluptatum, pariatur amet cupiditate fugiat perspiciatis nulla quod, rerum voluptate dolore saepe eos dolor est recusandae reiciendis odio exercitationem?" 
        });
    const fields = useSelector(state => state.Field.value)
    const { response, error, setOptions } = useFetchData('http://localhost:5000/user/upload')
    const formUpload = () => {
        if (window.localStorage.getItem("isLogged")) {
            setIsEdit(false)
            const formId = prompt("enter unique formName")
            console.log(fields)
            let ob = { fieldDetails: fields, formId: formId, ...formDetails }
            console.log(ob)
            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }, body: JSON.stringify(ob)
            }
            setOptions(options)
            return
        }
        alert("to upload  first login")
        navigate("/login")
    }
    const formDetailsUpdation=(obj)=>{
        setFormDetails({...formDetails,...obj})
    }

    const handleTitle = useDebounce((e) => {
        console.log(e.target.value)
        formDetailsUpdation({title: e.target.value })
    }, 500)
    const handleDescription = useDebounce((e) => {
        console.log(e.target.value)
        formDetailsUpdation( {description: e.target.value })
       
    }, 500)
    //response render
    useEffect(() => {
        if (response && !error) {
            console.log(response.data.url)
            navigate(`/public/${response.data.url}`)
            console.log(response);
        }
    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            alert("something went wrong")
            console.log(error)
            navigate("/error")
        }
    }, [error])

    useEffect(() => {
        if(!fields.length){
            alert("first upload a file ")
        }
        console.log(fields)
    }, [fields])

    useEffect(() => {
        const handleClickOutsidee = (e) => {
            if (e.target.classList.contains("changeAbleLabelName")) {
                if (e.key === "Enter") {
                    setIsEdit({...isEdit,isEditTitle:false,})
                    return
                }
            }
            if (e.target.classList.contains("changeAbleLabelNamePara")) {
                if (e.key === "Enter") {
                    setIsEdit({...isEdit,isEditDes:false})
                }
            }

        };
        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("key", handleClickOutsidee);
        };
    }, [isEdit]);
 
   
    return (
        !fields.length? <Navigate  to="/" />:
        <>
            {/* <Nav flag={true} />? */}
            <div className="upload-button  w-full  mt-5 flex justify-center mb-5">
                <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={formUpload} />
            </div>
            <div className="MainForm
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                <h1 className="font-bold text-center text-2xl p-2 ">
                    {isEdit.isEditTitle ?
                        <InputField placeholder={formDetails.title} className="outline-none bg-transparent changeAbleLabelName" onChange={handleTitle} />
                        :
                        <Label labelname={formDetails.title} onDoubleClick={
                            () => {
                                setIsEdit({...isEdit,isEditTitle:true})
                            }
                        } />}</h1>

                <div className="formDescription  text-center "   >
                    {isEdit.isEditDes ?
                        <InputField placeholder={formDetails.description} type="text-area" className="outline-none bg-transparent changeAbleLabelNamePara" onChange={handleDescription} />
                        :
                        <Label labelname={formDetails.description} onDoubleClick={
                            () => {
                                console.log("Sd")
                                setIsEdit({...isEdit,isEditDes:true})
                            }
                        } />}
                </div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} formClass="pt-5 bg-teal-50 border-2 border-gray-200 pb-10" >

                </ Form >
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;