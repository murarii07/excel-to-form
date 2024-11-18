import { useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { fetchData } from "../fetchData";
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/fetchData";

const FormUpload = () => {
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const [isEditPara, setIsEditPara] = useState(false);
    const [formDetails, setFormDetails] = useState({ title: "form title", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia praesentium adipisci! Neque, facere nisi quaerat cupiditate architecto harum cumque optio fugiat fugit sint possimus. Officia voluptatum, pariatur amet cupiditate fugiat perspiciatis nulla quod, rerum voluptate dolore saepe eos dolor est recusandae reiciendis odio exercitationem?" });
    const fields = useSelector(state => state.Field.value)
    const { response, error, setOptions } = useFetchData('http://localhost:5000/user/upload')
    const formUpload = async () => {

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
    }

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
            navigate("/login")
        }
    }, [error])

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
    const handleTitle = useDebounce((e) => {
        console.log(e.target.value)
        setFormDetails({ ...formDetails, title: e.target.value })
    }, 500)
    const handleDescription = useDebounce((e) => {
        console.log(e.target.value)
        setFormDetails({ ...formDetails, description: e.target.value })
    }, 500)
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
                <Form field={fields} Name={"form1"} buttonName={"Submit"} formClass="pt-5 bg-teal-50 border-2 border-gray-200 pb-10" >

                </ Form >
            </div>
            {/* <footer>footer</footer> */}
        </>
    );
}
export default FormUpload;