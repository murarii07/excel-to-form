import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
import ConfirmationBox from "../Atoms/ConfirmationBox";
import DialogBox from "../Atoms/DialogBox";
const FImg = lazy(() => import("../Atoms/img"))

const FormDetails = () => {
    const [confirm, setConfirm] = useState(false)
    const [dialog, setDialog] = useState({ flag: false, message: "error....." })
    const [isLoading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [formName] = useState(window.location.pathname.split("/").pop());
    const [response, error] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/v1/formDetails/${formName}`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [form, setForm] = useState({
        name: "",
        link: "",
        description: "",
        response: 0,
        timeStamp: ""
    })
    // response:res will help to deconstruct and change response to res
    const [res, er, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/v1/delete/${formName}`)
    //response render

    useEffect(() => {
        if (response && !error) {
            setLoading(false)
            setForm(response.data)
            console.log(response.data);
        }
        else if (error) {
            navigate("/error")
        }
    }, [response, error])

    useEffect(() => {
        if (res && !er) {
            console.log(res)
            alert("successfully delted")
            navigate("/tasks")
        }
        else if (er) {
            console.log(er.message)
            alert("deletion failed")
        }
    }, [res, er])

    const deleteHandle = async () => {
        setDialog({
            flag: true,
            message: "Are you sure you want to delete this form?"
        })
    }

    useEffect(() => {
        if (confirm) {
            // console.log(flag)
            setOptions({
                method: "DELETE",
                credentials: "include" // Sends cookies with the request
            })
            // setFlag(false)
        }
    }, [confirm])

    return (
        isLoading ? <SkeletonLoading /> :
            <>
                <Nav flag={true} />

                <div className="container mx-auto px-4 py-6">
                    <div className="h-full w-full bg-gradient-to-b from-white to-purple-50 flex flex-col items-center justify-start rounded-xl shadow-lg overflow-hidden">
                        <div className="w-full flex flex-col md:flex-row items-start gap-6 p-6">
                            <div
                                className="bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-xl shadow-md p-6 flex justify-center items-center border border-purple-200 flex-shrink-0 md:basis-1/4 md:max-w-[30%] hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                                style={{ minWidth: '100px', minHeight: '100px' }}
                            >
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute w-16 h-16 bg-purple-400/20 rounded-full animate-ping opacity-75"></div>
                                    <span
                                        className="material-symbols-outlined text-purple-600 text-[80px] md:text-[70px] lg:text-[80px] relative z-10"
                                    >
                                        assignment
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow bg-white rounded-xl shadow-md p-6 md:basis-3/4 space-y-6 animate-in slide-in-from-right-14 duration-500 border border-purple-100">
                                <h2 className="text-2xl font-bold text-purple-800 mb-4">Form Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-8 text-neutral-900">
                                    <div className="space-y-2">
                                        <div className="font-semibold text-purple-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">drive_file_rename_outline</span>
                                            Project Name
                                        </div>
                                        <div className="truncate text-neutral-700 bg-purple-50 p-3 rounded-lg shadow-inner border border-purple-100 ">
                                            {form.name}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="font-semibold text-purple-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">link</span>
                                            Shareable Link
                                        </div>
                                        <div className="flex gap-2 items-center bg-purple-50 p-2 rounded-lg shadow-inner border border-purple-100">
                                            <p className="truncate text-sm text-neutral-700 px-2 py-1 rounded-md flex-grow">
                                                <a
                                                    href= {`http://localhost:5173/formhost/${form.link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full hover:text-indigo-600 transition-colors duration-200 overflow-hidden"
                                                >
                                                    {`http://localhost:5173/formhost/${form.link}`}
                                                </a>
                                            </p>
                                            <Button
                                                className="material-symbols-outlined text-neutral-500 hover:text-purple-600 bg-white p-2 rounded-full shadow-inner hover:shadow-md transition-all duration-200"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`http://localhost:5173/formhost/${form.link}`)
                                                    alert("Link copied to clipboard!")
                                                }}
                                                name="content_copy"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <div className="font-semibold text-purple-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">description</span>
                                            Project Overview
                                        </div>
                                        <div className="text-neutral-700 bg-purple-50 p-3 rounded-lg shadow-sm border border-purple-200 min-h-24">
                                            {form.description}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="font-semibold text-purple-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">calendar_today</span>
                                            Created On
                                        </div>
                                        <div className="text-neutral-700 bg-purple-50 p-3 rounded-lg shadow-sm border border-purple-200">
                                            {(new Date(form.timeStamp)).toDateString()}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="font-semibold text-purple-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">analytics</span>
                                            Submission Count
                                        </div>
                                        <div className="text-neutral-700 bg-purple-50 p-3 rounded-lg shadow-sm border border-purple-200">
                                            <span className="text-xl font-bold text-indigo-600">{form.response}</span> responses
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6 pt-4 border-t border-purple-100">
                                    <Button
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                                        name={<>
                                            <span className="material-symbols-outlined text-sm">download</span>
                                            download
                                        </>}
                                       
                                    />

                                    <Button
                                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                                        name={<>
                                            <span className="material-symbols-outlined text-sm">settings</span>
                                            See Responses
                                        </>}
                                         onClick={(e)=>{
                                            // e.preventDefault();
                                            navigate(`/responses/${form.name}`)
                                            // e.stopPropogation()
                                        }}
                                    />

                                    <Button
                                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
                                        name={<>
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                            Delete
                                        </>}
                                        onClick={deleteHandle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ConfirmationBox isOpen={dialog.flag} setDialog={setDialog} message={dialog.message} setConfirm={setConfirm} />
                {/* <DialogBox isOpen={dialog1.flag} message={dialog1.message} setDialog={setDialog1} /> */}
            </>
    )
}

export default FormDetails;