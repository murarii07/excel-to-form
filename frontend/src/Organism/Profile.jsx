import { useEffect, useState } from "react";
import Button from '../Atoms/Button'
import {useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
const Profile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [dropdown, SetDropDown] = useState(false);
    const nav = useNavigate()
    const [details, setDetails] = useState({ name: "df", storage: 0, forms: [] })
    const { response, error} = useFetchData("http://localhost:5000/user/formlist", {
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
        const res = await fetch("http://localhost:5000/login", {
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
            <div className="user-dp w-6/12  m-auto mt-5  rounded-md">
                <div className="userImg font-bold text-center  w-full ">
                    <img src='/assets/user.png' alt="sdd" />
                </div>
                <div className="userName border-none m-auto  rounded-md    w-full font-bold md:text-2xl flex justify-center items-center">{details.name}</div>
            </div>

            {/* tasks */}

            <div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer     shadow-md relative flex justify-between "> <span>
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
            <div className="storage w-11/12 mx-auto mt-10 px-12 py-3  border-2 rounded-lg cursor-pointer shadow-md">
                {/* <span>
                storagebar:{`/5gb`}
                    </span>  */}

                <div className="">{!details.storage ? "1" : details.storage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-purple-300">
                    <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${!details.storage ? "1" : details.storage}%` }}></div>
                </div>
                <div className="text-end">{!details.storage ? "1" : details.storage}/6gb</div>

            </div>




            <div className="w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 flex  gap-5">
                <Button name="logout" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " onClick={logout} />
                <Button name="delete Account" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " />
            </div>




        </>)
}

export default Profile;