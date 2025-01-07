import { lazy, Suspense, useEffect, useState } from "react";
import Button from '../Atoms/Button'
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
import Label from '../Atoms/Label.jsx';
import InputField from '../Atoms/inputField.jsx';
const ProfileImg = lazy(() => import("../Atoms/img"))
const Profile = () => {
    const nav = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [dropdown, SetDropDown] = useState(false);
    const [details, setDetails] = useState({ name: "df", storage: 0, forms: [] })
    const { response, error } = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/formlist`, {
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
                storage: response.data.storageInBytes
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
        if (res.ok) {
            // console.log("sd")
            window.localStorage.removeItem("isLogged")
            nav("/")

        }
        else {
            alert("something went wrong try again")
        }
    }


    return (
        isLoading ? <SkeletonLoading />
            :
            <>

                <Nav flag={true} />
                <div className="  w-[95%] h-screen flex gap-2 justify-center mx-auto">

                    <div className="user-dp w-3/12 b  m-auto mt-5  rounded-md animate-in slide-in-from-left-96 duration-500">
                        <div className="userImg font-bold text-center  w-full ">
                            <Suspense fallback={<span>loading...</span>}>
                                <ProfileImg img={"/assets/user2.png"} className={""} />
                            </Suspense>
                        </div>


                    </div>

                    {/* tasks */}
                    <div className="w-8/12 h-full rounded-md animate-in slide-in-from-right-96 duration-500 ">

                        <div className="w-11/12 py-3 px-12 flex flex-col justify-evenly gap-5">
                            <div className="w-[90%] flex items-center  flex-wrap md:flex-nowrap">

                                <Label htmlFor={"email"} labelname={"Email"} />
                                <InputField name="Email" value="abhayaj07@gmail.com" readOnly={true} className={"text-gray-700 p-2 rounded-md bg-slate-200 shadow-md "} />
                            </div>
                            <div className="w-[90%] flex items-center flex-wrap md:flex-nowrap ">
                                <Label htmlFor={"username"} labelname={"username"} />
                                <InputField name="Username" value={details.name} readOnly={true} className={"text-gray-700 p-2 rounded-md bg-slate-200 shadow-md "}  />
                            </div>
                        </div>
                        <div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14  rounded-lg cursor-pointer    bg-violet-300 shadow-md relative flex justify-between  "> 
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
                        </div>
                        {/* </a> */}
                        {(dropdown && details.forms.length) ? details.forms.map((x, index) => (
                            <div className="MyTasks mx-auto mt-10 w-9/12 box-border px-12 py-3 min-h-12 border-2 rounded-lg cursor-pointer  shadow-md relative animate-in slide-in-from-top-10 duration-500"
                                key={index} onClick={(e) => {
                                    nav(`/tasks/${e.target.innerText}`)
                                }}>
                                {x}
                            </div>)) : ""}

                        {/* storage bar */}
                        <div className="storage w-11/12 mx-auto mt-10 px-12 py-3   rounded-lg cursor-pointer ">
                            {/* <span>
                storagebar:{`/5gb`}
                </span>  */}

                            <div className="">{!details.storage ? "1" : details.storage}%</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-purple-300 shadow-md">
                                <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${!details.storage ? "1" : details.storage / (1024 ** 3) * 100}%` }}></div>
                            </div>
                            <div className="text-end">{UnitConverstion(details.storage)}KB/5GB</div>

                        </div>
                        <div className="w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 flex  gap-5 ">
                            <Button name="logout" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white shadow-md shadow-red-300 " onClick={logout} />
                            <Button name="delete Account" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white  shadow-md shadow-red-300 " />
                        </div>



                    </div>

                </div>
            </>)
}

export default Profile;