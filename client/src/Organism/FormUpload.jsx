import { useDispatch, useSelector } from "react-redux";
import Form from "../Molecules/Form";
import { useCallback, useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/useFetchData";
import DialogBox from "../Atoms/DialogBox";
import PromptBox from "../Atoms/PromptBox";
import { changeFieldValue } from "../redux/formElement";
const FormUpload = () => {
    const nav = useNavigate()
    const fields = useSelector(state => state.Field.value)
    const [dialog, setDialog] = useState({ flag: false, message: "error....." })
    const [isEdit, setIsEdit] = useState({ isEditTitle: false, isEditDes: false });
    const [isInput, setInput] = useState({ flag: false, message: "error....." })
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/v1/upload`)
    const [formDetails, setFormDetails] = useState({
        formName: "",
        title: "form title",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officia praesentium adipisci! Neque, facere nisi quaerat cupiditate"
    });
    const dispatch = useDispatch()
    //form uploading to the server
    const formNameOperation = useCallback(() => {
        if (!window.localStorage.getItem("isLogged")) {
            alert("to upload  first login")
            nav("/login")
            return
        }
        setIsEdit(false)
        setInput({ flag: true, message: "please enter a formName" })
    }, [nav])
    const formDetailsUpdation = (obj) => {
        setFormDetails({ ...formDetails, ...obj })
    }
    // //useDebounce hook
    // const handleTitle = useDebounce((e) => {
    //     console.log(e.target.value)
    //     formDetailsUpdation({ title: e.target.value })
    // }, 200)
    // const handleDescription = useDebounce((e) => {
    //     console.log(e.target.value)
    //     formDetailsUpdation({ description: e.target.value })

    // }, 200)

    const FormUpload = () => {
        console.log("User Fields", fields, { fieldDetails: fields, formId: formDetails.formName, title: formDetails.title, description: formDetails.description })
        const fieldValues = fields.map((x) => {
            if (x.newField) {
                const { newField, ...field } = x
                return ({
                    ...field,
                    Name: field.LabelName,
                })
            }
            return ({
                ...x
            })
        })
        console.log("dsfffffffffffffffffffffffffffffff", fieldValues)
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ fieldDetails: fieldValues, formId: formDetails.formName, title: formDetails.title, description: formDetails.description })
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
            setTimeout(() => {
                nav(`/formhost/${response.data.url}`)
                dispatch(changeFieldValue([]))
            }, 2000)



        }
        else if (error) {
            alert("something went wrong")
            console.log(error)
            nav("/error")
        }

    }, [response, error])


    useEffect(() => {
        if (!fields.length) {
            setDialog({ flag: true, message: "first upload a file " })
        }
        console.log(fields)
    }, [fields])

    const handleFormUpload = () => {
        if (formDetails.formName.trim()) {
            FormUpload();
        }
    };
    useEffect(() => {
        if (formDetails.formName.trim()) {
            FormUpload()
        }
    }, [formDetails])
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
            document.querySelector("body").removeEventListener("keypress", handleClickOutsidee);
        };
    }, [isEdit]);

    useEffect(() => {
        if (!fields.length)
            nav("/")

    }, [])
    return (

        <>
            {/* <Nav flag={true} />? */}
            <div className="upload-button  w-full  mt-5 flex justify-center mb-5  ">
                <Button name={"upload"} buttonName={`p-1   flex justify-center bg-purple-600 border-purple-600 text-white font-bold s`} onClick={formNameOperation} />
            </div>
            <div className="MainForm min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg rounded-lg p-8 md:p-10
             mx-auto pl-2 pr-2 w-11/12 box-border flex flex-col">
                <h1 className="text-2xl md:text-3xl font-title text-neutral-950 mb-6 ">
                    {formDetails.title}
                </h1>


                <div className="formDescription  text-sm md:text-base text-neutral-700 mb-8 leading-relaxed "   >
                    {formDetails.description}
                </div>
                <Form field={fields} Name={"form1"} buttonName={"Submit"} formClass="flex flex-col gap-6" >

                </ Form >
            </div>
            {/* <footer>footer</footer> */}
            <DialogBox isOpen={dialog.flag} message={dialog.message} setDialog={setDialog} />
            <PromptBox isOpen={isInput.flag} message={isInput.message} setDialog={setInput} setFormDetails={formDetailsUpdation} />
        </>
    );
}
export default FormUpload;