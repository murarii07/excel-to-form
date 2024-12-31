import { lazy, Suspense, useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import CopyIcon  from '../svgs/copy.svg?react';
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
const  FImg=lazy(()=>import("../Atoms/img"))
const FormDetails = () => {
    const [isLoading, setLoading] = useState(true)
    const [flag, setFlag] = useState(true)
    const navigate = useNavigate()
    const [formName] = useState(window.location.pathname.split("/").pop());
    const { response, error } = useFetchData(`http://localhost:5000/user/formDetails/${formName}`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [form, setForm] = useState({ name: "temp", link: "adsd", description: "this is form detials " })
    // response:res will help to deconstruct and change response to res
    const { response: res, error: er, setOptions } = useFetchData(`http://localhost:5000/user/delete/${form.name}`)
    //response render


    useEffect(() => {
        if (response && !error) {
            setLoading(false)
            setForm(response.data)
            console.log(response);
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
        const s=confirm("are you sure")
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
                <div className="form-details   gap-10 mt-12  mx-auto w-11/12 flex flex-col justify-evenly items-center">
                    <div className="border-2 rounded-md shadow-md w-1/4 min-h-44 text-sm px-1 box-border flex items-center  justify-center bg-white">
                    <Suspense fallback={<span>loading...</span>} >
                        <FImg img={"/assets/fo.png" } className="object-cover " width="90%" height="90%" alt="s"  />
                    </Suspense>
                   </div>
                   <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-auto  ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-green-200">

        <tbody>
        <tr className="bg-white   dark:border-gray-700 hover:bg-gray-200 ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Form Id
                </th>
                <td className="px-6 py-4">
                    {form.Id || 0}
                </td>
               
            </tr>
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
                    {form.responses || 0}
                </td>
               
            </tr>
        </tbody>
    </table>
</div>
                    {/* <div className="font-semibold">{form.name}</div>
                    <div className="text-center">{form.description}</div>

                    <div
                        className="  p-1 w-11/12 rounded-lg  overflow-hidden relative shadow-inner shadow-gray-400">
                        <a
                            href={`http://localhost:3000/public/${form.link}`} target="_blank" rel="noopener noreferrer"
                            className="w-full hover:text-blue-500  overflow-hidden">{`http://localhost:3000/public/${form.link}`}
                        </a>
                        <CopyIcon onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:3000/public/${form.link}`)
                            alert("copied")
                        }} />

                    </div> */}
                    <div className="flex w-3/4  justify-around">
                        <Button name="delete" buttonName="w-1/4 bg-red-500 border-red-500 text-white" onClick={deleteHandle}></Button>
                       
                    </div>
                </div>




            </>
    )
}

export default FormDetails;