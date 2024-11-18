import { useEffect, useState } from "react";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
const UserForm = ({ data }) => {
    console.log(data.fields)
    const [fields, setFields] = useState([])
    const [url] = useState(window.location.pathname)
    const ext = url.split("/public/")
    const newUrl = "http://localhost:5000/public/" + ext[1];
    const { response, error, setOptions } = useFetchData(newUrl)
    const navigatee = useNavigate();
    useEffect(() => {
        setFields(data.fields)
        console.log(fields)
    }, [])

    async function dataSubmission(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log(form.entries())
        setOptions({ method: "POST", body: form })


    }
    useEffect(() => {
        if (response && !error) {
            console.log("d",response);
            navigatee("/submit");
        }
    }, [response])
    useEffect(() => {
        if (error) {
            navigatee("/error");
        }
    }, [error])
    return (
        !(data.fields.length) ? <SkeletonLoading />:
            <>
                <div className="userform mx-auto mt-5 flex flex-col w-11/12 items-center gap-10 ">
                    <div className="font-bold text-3xl" >{data.title}</div>
                    <div className="font-medium  text-md">{data.description}</div>

                    <div className="formDiv w-full  ">
                        <Form
                            formClass={"gap-10  grid grid-cols-1 w-full mx-auto bg-transparent"}
                            field={data.fields}
                            buttonName={"submit"}
                            buttonType={"submit"}
                            formHandles={dataSubmission} />
                    </div>
                </div>
            </>
    )
}
export default UserForm;