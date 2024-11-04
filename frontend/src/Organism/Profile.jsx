import { useEffect, useState } from "react";
import Button from '../Atoms/Button'
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
const Profile = () => {
    const [error, setError] = useState(false);
    const nav = useNavigate()
    const [storagebar, setStorageBar] = useState(0)
    const fetchw = async () => {
        try {

            const r = await fetch("http://localhost:5000/user/formlist", {
                method: "GET",
                credentials: "include" // Sends cookies with the request
            });
            const s = await r.json();
            console.log(s)
            if (s.success) {
                setStorageBar((s.data.storageInBytes / (1024 ** 3)).toFixed(2))
                console.log(s.data)
            }
            else {
                setError(true)
            }
        } catch (e) {
            setError(true)
        }
    }
    const logout = async () => {
        const res = await fetch("http://localhost:5000/login", {
            method: "DELETE",
            credentials: "include" // Sends cookies with the request
        });
        if (res.ok) {
            console.log("sd")
            nav("/")

        }
        else {
            alert("something went wrong try again")
        }
    }
    useEffect(() => {
        fetchw()
    }, [])
    if (error) {
        return <Navigate to="/error" />
        console.log(error)
    }
    else {

        return (
            <>
            <Nav flag={true} />
                <div className="user-dp w-6/12  m-auto mt-5  rounded-md">
                    <div className="userImg font-bold text-center  w-full ">
                        <img src='/assets/user.png' alt="sdd" />
                    </div>
                    <div className="userName  m-auto  rounded-md    w-full font-bold md:text-2xl flex justify-center items-center">UserName</div>
                </div>

                {/* tasks */}
                <a href="http://localhost:3000/tasks">
                    <div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer     shadow-md">My projects</div>
                </a>

                {/* storage bar */}
                <div className="storage w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer shadow-md">storagebar:{`${storagebar}/5gb`}</div>
                <div className="w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 flex  gap-5">

                    <Button name="logout" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " onClick={logout} />
                    <Button name="delete Account" buttonName="bg-red-600 border-2 border-red-600 p-1 border-box font-bold text-white " />
                </div>

            </>)
    }
}
export default Profile;