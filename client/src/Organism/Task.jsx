import Button from "../Atoms/Button";
import Nav from "../Molecules/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
import InputField from "../Atoms/inputField";
const MyTask = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [formList, setFormList] = useState([]);
    const navigate = useNavigate();
    const [response, error] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/v1/formlist`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [formListFilter, setFormListFilter] = useState(formList);
    const debounceHandler = useDebounce((e) => {
        console.log(e.target.value)
        if (formList.length) {
            if (e.target.value != null) {
                let arr = formList.filter(x => x.name.includes(e.target.value));
                setFormListFilter(arr);
            }
            else {
                setFormListFilter(formList)
            }
        }
    }, 500)

    //response render
    useEffect(() => {
        if (response && !error) {
            setFormListFilter(response.data.formlist);
            setFormList(response.data.formlist);
            console.log(response.data);
            setIsLoading(false)
        }
        else if (error) {
            setIsLoading(false)
            console.log("Error fetching form list:", error);
            window.localStorage.removeItem("isLogged")
            navigate("/login")
        }
    }, [response, error])



    return (

        isLoading ? (<SkeletonLoading />) : (
            <>
                <Nav flag={true} />
                <div className="min-h-screen  bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-start rounded-lg shadow-lg px-4 md:px-8 pt-4">
                    <div className="w-full flex flex-col md:flex-row items-center gap-4 mt-8">
                        <InputField
                            type="text"
                            placeholder="Search your forms"
                            className="flex-grow w-full md:max-w-[500px] px-4 py-3 rounded-full border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm" onChange={debounceHandler}
                        />
                        <Button className="w-full md:w-auto px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition shadow-sm" name="Search" />
                    </div>

                    <div className="w-full mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {/* New Form */}
                        <div className="flex flex-col items-center justify-center bg-purple-50 border-dashed border-2 border-purple-400 rounded-lg p-4 cursor-pointer transition hover:bg-purple-100" onClick={(e) => {
                            navigate("/")
                            e.stopPropagation();
                        }}>
                            <span className="material-symbols-outlined text-purple-600 text-5xl">add</span>
                            <p className="mt-2 font-title text-purple-600">New Form</p>
                        </div>
                        {/* Existing Forms */}
                        {formListFilter.map((x, index) => (
                            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start hover:shadow-lg transition cursor-pointer border-t" key={index}>
                                <div className="flex items-center justify-between w-full">
                                    <span className="material-symbols-outlined text-purple-500 text-4xl">
                                        edit_note
                                    </span>
                                    <details className="relative">
                                        <summary className="material-symbols-outlined text-neutral-400 hover:text-neutral-600 cursor-pointer">
                                            more_vert
                                        </summary>
                                        <ul className="absolute right-0 mt-2 bg-white rounded-md shadow-lg p-2 text-neutral-900 space-y-1 z-[20]">
                                            <li className="cursor-pointer hover:text-purple-500">Edit</li>
                                            <li className="cursor-pointer hover:text-purple-500">Delete</li>
                                        </ul>
                                    </details>
                                </div>
                                <p className="mt-4 font-semibold text-lg hover:text-purple-900" onClick={(e) => {
                                    navigate(x.name)
                                    // e.stopPropagation();
                                }}>{x.name}</p>
                                <p className="text-sm text-neutral-500 mt-1">Created on:{x.timeStamp} </p>
                            </div>
                        ))}

                    </div>
                    <footer className="w-full mt-auto flex items-center justify-center text-sm text-neutral-400 py-4">
                        <p>© 2023 FormX. All rights reserved.</p>
                    </footer>
                </div>
            </>)

    );
}


export default MyTask