import { useEffect, useState } from "react";
import Form from '../Molecules/Form'
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
// import "../form.css"
const UserForm = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({ title: "", description: "", fields: [] })
    const { formId } = useParams()
    const newUrl = `${import.meta.env.VITE_SERVER_API_URL}/public/v1/${formId}`;
    const [response, error] = useFetchData(newUrl, {
        method: "GET",
    })
    const [loading, setLoading] = useState(false)
    const [res, err, setSubmitOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/public/v1/${formId}`)
    async function dataSubmission(e) {
        e.preventDefault();
        try {
            const form = new FormData(e.target);
            console.log("Form Entries", [...form.entries()]);
            setSubmitOptions({ method: "POST", body: form });
            setLoading(true)
        } catch (error) {
            console.error("Submission Error:", error);
        }
    }
    useEffect(() => {
        if (response && !error) {
            console.log("d", response);
            setDetails(response.data)

        }
        else if (error) {
            navigate("/error");

        }
    }, [response, error])

    useEffect(() => {
        if (res && !err) {
            setLoading(false)
            navigate("/submit");
        }
        else if (err) {
            navigate("/error");

        }
    }, [res, err])
    return (
        !(response) || loading ? <SkeletonLoading /> :
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