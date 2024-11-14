import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
const UserForm = ({ data }) => {
    console.log(data.fields)
    const [fields, setFields] = useState([])
    const [url, setUrl] = useState(window.location.pathname)
    const navigatee = useNavigate();
    useEffect(() => {
        setFields(data.fields)
        console.log(fields)
    }, [])

    async function dataSubmission(e) {
        try {
            e.preventDefault();
            const ext = url.split("/public/")
            const newUrl = "http://localhost:5000/public/" + ext[1];
            const form = new FormData(e.target);
            const res = await fetchData(newUrl, { method: "POST", body: form });
            if (res.ok) {
                navigatee("/submit");
            }
            console.log(res);
        }
        catch (e) {
            console.error(e);
        }

    }
    return (
        <>
            <div className="userform mx-auto mt-5 flex flex-col w-11/12 items-center gap-10 ">
                <div className="font-bold text-3xl" >{data.title}</div>
                <div className="font-medium  text-md">{data.description}</div>

                <div className="formDiv w-full ">
                    <Form
                        formClass={"gap-10  grid grid-cols-1 w-full mx-auto"}
                        field={data.fields}
                        buttonName={"submit"}
                        formHandles={dataSubmission} />
                </div>
            </div>
        </>
    )
}
export default UserForm;