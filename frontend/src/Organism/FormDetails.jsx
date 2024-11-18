import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import { ReactComponent as CopyIcon } from '../svgs/copy.svg';
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
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
        if (flag) {
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
                    <div className="border-2 rounded-md shadow-md w-1/4 min-h-40 text-sm px-1 box-border flex items-center justify-center"><img src="assets/user.png" width="90%" height="90%" alt="s"  /></div>
                    <div className="font-semibold">{form.name}</div>
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

                    </div>
                    <div className="flex w-3/4  justify-around">
                        <Button name="delete" buttonName="w-1/4 bg-red-500 border-red-500 text-white" onClick={deleteHandle}></Button>
                        <Button name="Modify" buttonName="w-1/4 bg-teal-500 border-teal-500 text-white" />
                    </div>
                </div>
            </>
    )
}

export default FormDetails;