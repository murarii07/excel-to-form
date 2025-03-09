import { useEffect, useState } from "react";
import Form from '../Molecules/Form'
import { useNavigate } from "react-router-dom";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
// import "../form.css"
const UserForm = () => {
    const navigatee = useNavigate();
    const [details, setDetails] = useState({ title: "", description: "", fields: [] })
    const [url] = useState(window.location.pathname)
    const ext = url.split("/public/")
    const newUrl = `${import.meta.env.VITE_SERVER_API_URL}/public/${ext[1]}`;
    const [response, error] = useFetchData(newUrl, {
        method: "GET",
    })
    const [res, err, setSubmitOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/public/${ext[1]}`)
    async function dataSubmission(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log("Form Entries", form.entries())
        setSubmitOptions({ method: "POST", body: form })
    }
    useEffect(() => {
        if (response && !error) {
            console.log("d", response);
            setDetails(response.data)

        }
        else if (error) {
            navigatee("/error");

        }
    }, [response, error])

    useEffect(() => {
        if (res && !err) {
            navigatee("/submit");
        }
        else if (err) {
            navigatee("/error");

        }
    }, [res, err])
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