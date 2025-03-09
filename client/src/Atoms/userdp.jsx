import { useNavigate } from "react-router-dom";
import Button from "./Button"
import useFetchData from "../CustomHooks/useFetchData";
import { useEffect } from "react";
const UserDp = () => {
    const nav = useNavigate();
    const [res, er, setLogoutOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/login`)
    const logout = () => {
        setLogoutOptions({
            method: "DELETE",
            credentials: "include" // Sends cookies with the request
        })
    }
    useEffect(() => {
        if (res && !er) {
            window.localStorage.removeItem("isLogged")
            nav("/")
        }
    }, [res])
    //error render
    useEffect(() => {
        if (er) {
            alert("something went wrong try again")
            console.log("something went wrong")
        }
    }, [er])

    return (
        <div className="border-2 border-neutral-200 rounded-xl w-60 flex flex-col justify-center      box-border min-h-32  shadow-md absolute top-10 right-2 bg-purple-50 shadow-purple-100 px-3 ">
            <div className="w-full px-5 py-1 hover:bg-purple-500 hover:text-neutral-50 rounded-2xl ">
                <a href="/my-profile" target="_blank">My Account</a></div>
            <div className="px-5 py-1 hover:bg-purple-500  rounded-2xl  hover:text-neutral-50 ">
                <a href="/tasks" target="_blank">Tasks</a></div>
            <div className="px-5  py-1">
                <Button name="logout" className={"bg-red-500 border-2 rounded-2xl border-red-500 text-white px-2"} onClick={logout} /></div>
        </div>
    )
}
export default UserDp