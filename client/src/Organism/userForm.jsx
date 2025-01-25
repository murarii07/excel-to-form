import { useEffect, useState } from "react";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
// import "../form.css"
const UserForm = () => {
    const navigatee = useNavigate();
    const [details, setDetails] = useState({ title: "", description: "", fields: [] })
    const [url] = useState(window.location.pathname)
    const ext = url.split("/public/")
    const newUrl = `${import.meta.env.VITE_SERVER_API_URL}/public/${ext[1]}`;
    const { response, error } = useFetchData(newUrl, {
        method: "GET",
    })
    async function dataSubmission(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log("Form Entries",form.entries())
        const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/public/${ext[1]}`, { method: "POST", body: form });
        if (!res.ok) {
            navigatee("/error");
            return;
        }
        navigatee("/submit");
    }
    useEffect(() => {
        if (response && !error) {
            console.log("d", response);
            setDetails(response.data)
            return
        }
        if (error) {
            navigatee("/error");
            return;
        }
    }, [response, error])
    return (
        !(response) ? <SkeletonLoading /> :
            <>
                <div className="w-full min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 shadow-lg rounded-lg p-8 md:p-10">

                    <h1 className="text-2xl md:text-3xl font-title text-neutral-950 mb-6 ">
                        {details.title}
                    </h1>
                    <p className="text-sm md:text-base text-neutral-700 mb-8 leading-relaxed ">
                        {details.description}
                    </p>
                    <Form
                        formClass={"flex flex-col gap-6   "}
                        field={details.fields}
                        buttonName={"submit"}
                        buttonType={"submit"}
                        formHandles={dataSubmission} />


                </div>

            </>
    )
}
export default UserForm;