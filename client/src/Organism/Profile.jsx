import { lazy, Suspense, useEffect, useState } from "react";
import Button from '../Atoms/Button'
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
// import Label from '../Atoms/Label.jsx';
// import InputField from '../Atoms/inputField.jsx';
import '../profile.css'
const ProfileImg = lazy(() => import("../Atoms/img"))
const Profile = () => {
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    // const [dropdown, SetDropDown] = useState(false);
    const [details, setDetails] = useState({ name: "df", storage: 0, forms: [],email:"" })
    const { response, error } = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/details`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
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
                email:response.data.email
            })
            console.log(response.data)
            console.log(response);
            setIsLoading(false)
        }
    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            console.log(error)
            window.localStorage.removeItem("isLogged")
            nav("/login")
        }
    }, [error])

    const logout = async () => {
        const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/login`, {
            method: "DELETE",
            credentials: "include" // Sends cookies with the request
        });
        if (!res.ok) {
            alert("something went wrong try again")
            return
        }
        // console.log("sd")
        window.localStorage.removeItem("isLogged")
        nav("/")
    }


    return (
        isLoading ? <SkeletonLoading />
            :
            <>

                <Nav flag={true} />
                {/* <div className="  w-[95%] h-screen flex gap-2 justify-center mx-auto "> */}

                {/* <div className="user-dp w-3/12 b  m-auto mt-5  rounded-md animate-in slide-in-from-left-96 duration-500">
                        <div className="userImg font-bold text-center  w-full ">
                            <Suspense fallback={<span>loading...</span>}>
                                <ProfileImg img={"/assets/user2.png"} className={""} />
                            </Suspense>
                        </div>


                    </div> */}

                {/* tasks */}
                {/* <div className="w-8/12 h-full rounded-md animate-in slide-in-from-right-96 duration-500 "> */}

                {/* <div className="w-11/12 py-3 px-12 flex flex-col justify-evenly gap-5">
                            <div className="w-[90%] flex items-center  flex-wrap md:flex-nowrap">

                                <Label htmlFor={"email"} labelname={"Email"} />
                                <InputField name="Email" value="abhayaj07@gmail.com" readOnly={true} className={"text-gray-700 p-2 rounded-md bg-slate-200 shadow-md "} />
                            </div>
                            <div className="w-[90%] flex items-center flex-wrap md:flex-nowrap ">
                                <Label htmlFor={"username"} labelname={"username"} />
                                <InputField name="Username" value={details.name} readOnly={true} className={"text-gray-700 p-2 rounded-md bg-slate-200 shadow-md "}  />
                            </div>
                        </div> */}
                {/* <div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14  rounded-lg cursor-pointer    bg-violet-300 shadow-md relative flex justify-between  "> 
                        <div className="flex w-full  items-center gap-x-3">
                            <div>
                            <img src="/assets/logo.png" width={"40px"} alt="" />
                            </div>
                            <div>
                            <a href="/tasks">
                                My Forms
                                </a>
                            </div>
                        </div>
                            <div className="text-2xl font-bold" onClick={(e) => {
                                SetDropDown(!dropdown)
                                if (e.target.innerText === "+") {
                                    e.target.innerText = "-"
                                }
                                else {
                                    e.target.innerText = "+"
                                }
                                e.stopPropagation()
                            }}>+</div>
                        </div> */}
                {/* </a> */}
                {/* {(dropdown && details.forms.length) ? details.forms.map((x, index) => (
                            <div className="MyTasks mx-auto mt-10 w-9/12 box-border px-12 py-3 min-h-12 border-2 rounded-lg cursor-pointer  shadow-md relative animate-in slide-in-from-top-10 duration-500"
                                key={index} onClick={(e) => {
                                    nav(`/tasks/${e.target.innerText}`)
                                }}>
                                {x}
                            </div>)) : ""} */}

                {/* storage bar */}
                {/* <div className="storage w-11/12 mx-auto mt-10 px-12 py-3   rounded-lg cursor-pointer ">
                            

                            <div className="">{!details.storage ? "1" : details.storage}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-purple-300 shadow-md">
                                <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${!details.storage ? "1" : details.storage / (1024 ** 3) * 100}%` }}></div>
                             </div>
                             <div className="text-end">{UnitConverstion(details.storage)}KB/5GB</div>

                        </div> */}
                {/* <div className="w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 flex  gap-5 ">
                            <Button name="logout" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white shadow-md shadow-red-300 " onClick={logout} />
                            <Button name="delete Account" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white  shadow-md shadow-red-300 " />
                        </div> */}


                {/* </div> */}

                {/* </div> */}

                <div id="webcrumbs" className="">
                    <div className="min-h-[600px] bg-neutral-50 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 animate-in slide-in-from-top-96 duration-500">
                        {/* <header className="flex items-center justify-between bg-purple-600 text-primary-50 px-4 py-3 rounded-lg">
                            <i className="material-symbols-outlined text-3xl cursor-pointer">menu</i>
                            <h1 className="font-title text-2xl md:text-3xl">FormX</h1>

                            <i className="material-symbols-outlined text-3xl cursor-pointer">
                                account_circle
                            </i>
                        </header> */}

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



            </>
    )
}

export default Profile;