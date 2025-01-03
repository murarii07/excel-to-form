import { lazy, Suspense, useEffect, useState } from "react";
import Button from '../Atoms/Button'
import {useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
const ProfileImg=lazy(()=>import("../Atoms/img"))
const Profile = () => {
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [dropdown, SetDropDown] = useState(false);
    const [details, setDetails] = useState({ name: "df", storage: 0, forms: [] })
    const { response, error} = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/formlist`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    //response render
    useEffect(() => {
        if (response && !error) {
            setDetails({ forms: response.data.formlist, name: response.data.name, storage: ((response.data.storageInBytes / (1024 ** 3)).toFixed(2)) / 5 * 100 })
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
        if (res.ok) {
            console.log("sd")
            window.localStorage.removeItem("isLogged")
            nav("/")

        }
        else {
            alert("something went wrong try again")
        }
    }


    return (
        isLoading?<SkeletonLoading />
        :
        <>
        
            <Nav flag={true} />
            <div className="user-dp w-6/12  m-auto mt-5  rounded-md animate-in slide-in-from-left-96 duration-500">
                <div className="userImg font-bold text-center  w-full ">
                    <Suspense fallback={<span>loading...</span>}>
                        <ProfileImg img={"/assets/user.png"} />
                    </Suspense>
                </div>
                <div className="userName  m-auto  rounded-md    w-2/4 md:text-xl flex justify-center items-center   bg-gray-300   text-gray-800">{details.name}</div>
                
            </div>

            {/* tasks */}

            <div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer     shadow-md relative flex justify-between animate-in slide-in-from-left-96 duration-500 "> <span>
                <a href="/tasks">
                    My projects</a>
            </span>
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
            </div>
            {/* </a> */}
            {(dropdown && details.forms.length) ? details.forms.map((x, index) => (
                <div className="MyTasks mx-auto mt-10 w-9/12 box-border px-12 py-3 min-h-12 border-2 rounded-lg cursor-pointer  shadow-md relative"
                    key={index}><a href={`http://localhost:3000/tasks/${x}`}>
                        {x}</a>
                </div>)) : ""}

            {/* storage bar */}
            <div className="storage w-11/12 mx-auto mt-10 px-12 py-3  border-2 rounded-lg cursor-pointer shadow-md animate-in slide-in-from-left-96 duration-500">
                {/* <span>
                storagebar:{`/5gb`}
                    </span>  */}

                <div className="">{!details.storage ? "1" : details.storage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-purple-300">
                    <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${!details.storage ? "1" : details.storage}%` }}></div>
                </div>
                <div className="text-end">{!details.storage ? "1" : details.storage}/6gb</div>

            </div>




            <div className="w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 flex  gap-5 animate-in slide-in-from-left-96 duration-500">
                <Button name="logout" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " onClick={logout} />
                <Button name="delete Account" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " />
            </div>




        </>)
}

export default Profile;