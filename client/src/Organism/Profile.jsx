import { lazy, Suspense, useEffect, useState } from "react";
import Button from '../Atoms/Button'
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
// import Label from '../Atoms/Label.jsx';
// import InputField from '../Atoms/inputField.jsx';
import '../profile.css'
import { toast, ToastContainer } from "react-toastify";
const ProfileImg = lazy(() => import("../Atoms/img"))
const Profile = () => {
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState({ name: "df", storage: 0, forms: [], email: "" })
    const [response, error] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/details`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [res, er, setLogoutOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/login`)
    function UnitConverstion(sbyte) {
        //if 1024 then it counts in KB other wise in mb
        let pow = sbyte >= 1024 * 1024 ? 2 : 1
        const dc = sbyte / (1024 ** pow);
        return dc.toFixed(2);

    }
    //response render
    useEffect(() => {
        if (response && !error) {
            setDetails({
                forms: response.data.formlist,
                name: response.data.name,
                storage: response.data.storageInBytes,
                email: response.data.email
            })
            console.log(response.data)
            console.log(response);
            setIsLoading(false)
        }
        else if (error) {
            console.log(error)
            window.localStorage.removeItem("isLogged")
            nav("/login")
        }
    }, [response, error])
    const logout = async () => {
        setLogoutOptions({
            method: "DELETE",
            credentials: "include" // Sends cookies with the request
        })
        // console.log("sd")
    }
    const d = (msg) => toast(msg)
    useEffect(() => {
        if (res && !er) {
            window.localStorage.removeItem("isLogged")
            d("successfully logout")
            setTimeout(() => nav("/"), 2000)
        }
        else if (er) {
            d("something went wrong")
            console.log("something went wrong")
        }
    }, [res, er])

    return (
        isLoading ? <SkeletonLoading />
            :
            <>
                <Nav flag={true} />
                <div id="webcrumbs" className="">
                    <div className="min-h-[600px] bg-neutral-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-in slide-in-from-top-96 duration-500">

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 md:gap-8 ">
                            <div className="flex flex-col items-center">
                                <Suspense fallback={<span>loading.....</span>} >
                                    <ProfileImg src="/assets/1.png"
                                        className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg object-contain"
                                        alt="avatar" />
                                </Suspense>
                                <h2 className="font-title text-xl sm:text-2xl mt-4 text-center">
                                    My Profile
                                </h2>
                            </div>

                            <div className="md:col-span-2 flex flex-col items-start gap-4 mt-6 md:mt-0">
                                <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                                    <p className="font-semibold text-sm sm:text-base md:text-lg w-28 md:w-auto">
                                        Email:
                                    </p>
                                    <div className="bg-neutral-200 px-3 py-2 rounded-md shadow-md text-neutral-900 flex-grow">
                                        {details.email}
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                                    <p className="font-semibold text-sm sm:text-base md:text-lg w-28 md:w-auto">
                                        Username:
                                    </p>
                                    <div className="bg-neutral-200 px-3 py-2 rounded-md shadow-md text-neutral-900 flex-grow">
                                        {details.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-purple-200 rounded-lg p-4 shadow-md">
                            <details className="w-full">
                                <summary className="flex justify-between items-center cursor-pointer">
                                    <h3 className="font-title text-purple-900 text-lg sm:text-xl flex items-center gap-2">
                                        <i className="material-symbols-outlined text-xl sm:text-2xl text-purple-700">
                                            list_alt
                                        </i>{' '}
                                        My Forms
                                    </h3>
                                    <span className="material-symbols-outlined text-purple-700 text-2xl">
                                        add
                                    </span>
                                </summary>
                                <ul className="mt-4 list-disc pl-6 space-y-2">
                                    {(details.forms.length) ? details.forms.map((x, index) => (
                                        <li className="text-sm sm:text-base text-neutral-800 cursor-pointer"
                                            key={index} onClick={(e) => {
                                                nav(`/tasks/${x}`)
                                            }}>
                                            Form {index + 1} -  {x} Form
                                        </li>)) : ""}
                                </ul>
                            </details>
                        </div>

                        <div className="mt-8">
                            <div className="text-gray-800 flex justify-between items-center mb-2 text-sm md:text-base">
                                <span className="font-medium">{UnitConverstion(details.storage)}%</span>
                                <span>{UnitConverstion(details.storage)}KB/5GB</span>
                            </div>
                            <div className="w-full bg-purple-300 h-3 sm:h-4 rounded-full">
                                <div
                                    className="bg-purple-600 h-full rounded-full"
                                    style={{ width: `${UnitConverstion(details.storage) < 1 ? 1 : UnitConverstion(details.storage)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                            <Button
                                className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-600 shadow-md"
                                onClick={logout}
                                name={"Logout"}
                            />
                            <Button
                                className="bg-red-700 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-800 shadow-md"
                                name=" Delete Account" />

                        </div>
                    </div>
                </div>
                <ToastContainer />


            </>
    )
}

export default Profile;