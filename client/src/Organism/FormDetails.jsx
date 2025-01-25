import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
// import CopyIcon from '../svgs/copy.svg?react';
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
const FImg = lazy(() => import("../Atoms/img"))
const FormDetails = () => {
    const [isLoading, setLoading] = useState(true)
    const [flag, setFlag] = useState(true)
    const navigate = useNavigate()
    const [formName] = useState(window.location.pathname.split("/").pop());
    const { response, error } = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/formDetails/${formName}`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [form, setForm] = useState({ name: "temp", link: "adsd", description: "this is form detials ", response: 0, timeStamp: "21th November 2024" })
    // response:res will help to deconstruct and change response to res
    const { response: res, error: er, setOptions } = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/delete/${form.name}`)
    //response render


    useEffect(() => {
        if (response && !error) {
            setLoading(false)
            setForm(response.data)
            console.log(response.data);
        }

    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            navigate("/error")
        }
        if (er) {
            console.log(er.message)
            alert("deletion failed")
        }
    }, [error, er])
    useEffect(() => {
        if (res && !er) {
            console.log(res)
            alert("successfully deleted")
            navigate("/tasks")
        }
    }, [res])

    const deleteHandle = async () => {
        const s = confirm("are you sure")
        if (flag && s) {
            console.log(flag)
            setOptions({
                method: "DELETE",
                credentials: "include" // Sends cookies with the request
            })
            setFlag(false)
        }

    }

    return (
        isLoading ? <SkeletonLoading /> :
            <>
                <Nav flag={true} />
                {/* <div className="form-details   gap-x-7 mt-12  mx-auto w-11/12 flex  justify-evenly items-center h-full animate-in slide-in-from-top-14 duration-500">
                    <div className="border-2 rounded-md shadow-md w-1/5 min-h-44 text-sm px-1 box-border flex items-center  justify-center bg-white">
                        <Suspense fallback={<span>loading...</span>} >
                            <FImg img={"/assets/fo.png"} className="object-cover " width="90%" height="90%" alt="s" />
                        </Suspense>
                    </div>
                    <div className="w-4/5 flex flex-col gap-y-4">
                        <div className="relative overflow-x-auto  sm:rounded-lg w-full mx-auto h-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-green-200 ">

                                <tbody>
                                    <tr className="bg-white  dark:border-gray-700 hover:bg-gray-200 ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Form name
                                        </th>
                                        <td className="px-6 py-4">
                                            {form.name}
                                        </td>

                                    </tr>
                                    <tr className="bg-white  dark:border-gray-700 hover:bg-gray-200 ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Url
                                        </th>
                                        <td className="px-6 py-4 relative">
                                            <div
                                                className="  p-1 w-full rounded-lg  overflow-hidden  shadow-gray-400 ">
                                                <a
                                                    href={`http://localhost:5173/public/${form.link}`} target="_blank" rel="noopener noreferrer"
                                                    className="w-full hover:text-blue-500  overflow-hidden">{`http://localhost:5173/public/${form.link}`}
                                                </a>
                                                <CopyIcon onClick={() => {
                                                    navigator.clipboard.writeText(`http://localhost:5173/public/${form.link}`)
                                                    alert("copied")
                                                }} />

                                            </div>
                                        </td>

                                    </tr>
                                    <tr className="bg-white  dark:border-gray-700 hover:bg-gray-200 ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Form Description
                                        </th>
                                        <td className="px-6 py-4">
                                            {form.description}
                                        </td>

                                    </tr>
                                    <tr className="bg-white  dark:border-gray-700 hover:bg-gray-200 ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Date of Creation
                                        </th>
                                        <td className="px-6 py-4">
                                            {form.timeStamp || "21th November 2024"}
                                        </td>

                                    </tr>
                                    <tr className="bg-white  dark:border-gray-700 hover:bg-gray-200 ">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            Responses
                                        </th>
                                        <td className="px-6 py-4">
                                            {form.response || 0}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <div className="flex w-3/4  justify-around ">
                                <Button name="delete" buttonName="w-1/4 bg-red-500 border-red-500 text-white" onClick={deleteHandle}></Button>

                                {/* //form Setting */}
                {/* <Button name="Settings" buttonName="w-1/4 bg-slate-500 border-red-500 text-white" ></Button>


                            </div>
                    </div>
                </div>  */}



                <div id="webcrumbs">
                    <div className="h-full w-full bg-neutral-50 flex flex-col items-center justify-start rounded-lg shadow-lg  ">
                        <div className="w-full flex flex-col md:flex-row items-start gap-6 p-6 ">
                            <div
                                className="bg-white rounded-lg shadow-md p-4 flex justify-center items-center border border-purple-200 flex-shrink-0 md:basis-1/4 md:max-w-[30%] hover:shadow-lg transition-shadow animate-in slide-in-from-left-14 duration-500"
                                style={{ minWidth: '100px', minHeight: '100px' }}
                            >
                                <span
                                    className="material-symbols-outlined text-purple-600 text-[80px] md:text-[70px] lg:text-[80px]"
                                    style={{ zIndex: '1' }}
                                >
                                    assignment
                                </span>
                            </div>

                            <div className="flex flex-col flex-grow bg-white rounded-lg shadow-md p-6 md:basis-3/4 space-y-6 animate-in slide-in-from-right-14 duration-500 border-t">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-6 text-neutral-900">
                                    <div className="font-semibold text-neutral-700">Project Name</div>
                                    <div className="truncate text-neutral-600 overflow-hidden">
                                        {form.name}
                                    </div>
                                    <div className="font-semibold text-neutral-700">Shareable Link</div>
                                    <div className="flex gap-2 items-center">
                                        <p className="truncate text-sm text-neutral-600 bg-neutral-100 px-2 py-1 rounded-md">
                                            <a
                                                href={`http://localhost:5173/public/${form.link}`} target="_blank" rel="noopener noreferrer"
                                                className="w-full hover:text-blue-500  overflow-hidden">{`http://localhost:5173/public/${form.link}`}
                                            </a>
                                        </p>
                                        <Button className="material-symbols-outlined text-neutral-500 hover:text-purple-600" onClick={() => {
                                            navigator.clipboard.writeText(`http://localhost:5173/public/${form.link}`)
                                            alert("copied")
                                        }}
                                            name="content_copy" />

                                    </div>
                                    <div className="font-semibold text-neutral-700">Project Overview</div>
                                    <div className="text-sm text-neutral-600">
                                        {form.description}
                                    </div>
                                    <div className="font-semibold text-neutral-700">Created On</div>
                                    <div className="text-neutral-600"> {form.timeStamp}</div>
                                    <div className="font-semibold text-neutral-700">Submission Count</div>
                                    <div className="text-neutral-600">{form.response}</div>
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <Button
                                        className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition shadow-sm"
                                        name="Delete" onClick={deleteHandle}
                                    />

                                    <Button className="px-6 py-3 bg-gray-500 text-white rounded-full font-semibold hover:bg-gray-600 transition shadow-sm" name="Settings" />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
    )
}

export default FormDetails;