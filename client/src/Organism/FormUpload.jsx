import { useDispatch, useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/useFetchData";
import DialogBox from "../Atoms/DialogBox";
import PromptBox from "../Atoms/PromptBox";
import { changeSpecificFieldValue } from "../redux/formElement";

const FormUpload = () => {
    const navigate = useNavigate()
    const fields = useSelector(state => state.Field.value)
    const [dialog, setDialog] = useState({ flag: false, message: "error....." })
    const [isEdit, setIsEdit] = useState({ isEditTitle: false, isEditDes: false });
    const [isInput, setInput] = useState({ flag: false, message: "error....." })
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/upload`)
    const [formName, setFormName] = useState("")
    const [formDetails, setFormDetails] = useState({
        title: "form title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia praesentium adipisci! Neque, facere nisi quaerat cupiditate"
    });
    const nav=useNavigate()
    const dispatch=useDispatch()
    //form uploading to the server
    const formNameOperation = () => {
        if (!window.localStorage.getItem("isLogged")) {
            alert("to upload  first login")
            navigate("/login")
            return
        }
        setIsEdit(false)
        setInput({ flag: true, message: "please enter a formName" })
    }
    const formDetailsUpdation = (obj) => {
        setFormDetails({ ...formDetails, ...obj })
    }
    //useDebounce hook
    const handleTitle = useDebounce((e) => {
        console.log(e.target.value)
        formDetailsUpdation({ title: e.target.value })
    }, 200)
    const handleDescription = useDebounce((e) => {
        console.log(e.target.value)
        formDetailsUpdation({ description: e.target.value })

    }, 200)

    const FormUpload = () => {
        console.log("User Fields", fields, { fieldDetails: fields, formId: formName, ...formDetails })
       
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ fieldDetails: fields, formId: formName, ...formDetails })
        }
        setOptions(options)
    }
    //response render
    useEffect(() => {
        if (response && !error) {
            console.log(response.data.url)
            // navigate(`/public/${response.data.url}`)
            console.log("Response", response);
            setDialog({ flag: true, message: response.message })
            nav(response.data.url)
            
        }
        else if (error) {
            alert("something went wrong")
            console.log(error)
            navigate("/error")
        }

    }, [response, error])


    useEffect(() => {
        if (!fields.length) {
            setDialog({ flag: true, message: "first upload a file " })
        }
        console.log(fields)
    }, [fields])

    useEffect(() => {
        if (formName) {
            FormUpload()
        }

    }, [formName])
    useEffect(() => {
        const handleClickOutsidee = (e) => {
            if (e.target.classList.contains("changeAbleLabelName")) {
                if (e.key === "Enter") {
                    setIsEdit({ ...isEdit, isEditTitle: false, })
                    return
                }
            }
            if (e.target.classList.contains("changeAbleLabelNamePara")) {
                if (e.key === "Enter") {
                    setIsEdit({ ...isEdit, isEditDes: false })
                }
            }

        };
        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("key", handleClickOutsidee);
        };
    }, [isEdit]);


    return (
        !fields.length ? <Navigate to="/" /> :
            <>
                {/* <Nav flag={true} />? */}
                <div className="upload-button  w-full  mt-5 flex justify-center mb-5  ">
                    <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={formNameOperation} />
                </div>
                <div className="MainForm min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg rounded-lg p-8 md:p-10
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-title text-neutral-950 mb-6 ">
                        {isEdit.isEditTitle ?
                            <InputField placeholder={formDetails.title} className="outline-none bg-transparent changeAbleLabelName" onChange={handleTitle} />
                            :
                            <Label labelname={formDetails.title} onDoubleClick={
                                () => {
                                    setIsEdit({ ...isEdit, isEditTitle: true })
                                }
                            } />}</h1>

                    <div className="formDescription  text-sm md:text-base text-neutral-700 mb-8 leading-relaxed "   >
                        {isEdit.isEditDes ?
                            <InputField placeholder={formDetails.description} type="text-area" className="outline-none bg-transparent changeAbleLabelNamePara" onChange={handleDescription} />
                            :
                            <Label labelname={formDetails.description} onDoubleClick={
                                () => {
                                    console.log("Sd")
                                    setIsEdit({ ...isEdit, isEditDes: true })
                                }
                            } />}
                    </div>
                    <Form field={fields} Name={"form1"} buttonName={"Submit"} formClass="flex flex-col gap-6" >

                    </ Form >
                </div>
                {/* <footer>footer</footer> */}
                <DialogBox isOpen={dialog.flag} message={dialog.message} setDialog={setDialog} />
                <PromptBox isOpen={isInput.flag} message={isInput.message} setDialog={setInput} setFormName={setFormName} />
            </>
    );
}
export default FormUpload;