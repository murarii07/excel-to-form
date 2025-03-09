import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import useFetchData from "../CustomHooks/useFetchData";
function SideBar({ handle }) {
    const navigate = useNavigate();
    const [ar] = useState([
        { name: "MyAccount", link: "my-profile", svg: ("person") },
        { name: "Mytasks", link: "tasks", svg: ("task") },
        { name: "Home", link: "", svg: ("Home") }
    ])
    const [res, er, setLogoutOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/login`)
    const nav = useNavigate();
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
        else if (er) {
            alert("something went wrong try again")
            console.log("something went wrong")
        }
    }, [res, er])

    return (
        <div className="sidebar p-2 animate-in slide-in-from-left-96 duration-500  overflow-hidden h-[600px] md:h-screen absolute top-1 bg-purple-500 z-10 border-purple-500 hover:w-60 shadow-lg rounded-r-2xl " style={{ width: "240px" }}>
            <div className="flex items-center justify-between px-4 py-2 w-full text-primary-50 border-b border-purple-600 h-[10%]">
                <span className="text-white text-lg ">Menu</span>

                <Button name="close" buttonName={"material-symbols-outlined w-7 max-h-4 text-white   top-1 left-2"} onClick={handle} />
            </div>
            <ul className=" mt-5 flex flex-col box-border h-[75%] ">
                {
                    ar.map((x, index) => (
                        <li key={index} className="  flex rounded-2xl hover:bg-purple-600 md:hover:bg-purple-600 p-4 text-white text-lg hover:text-neutral-50 cursor-pointer " onClick={() => {
                            navigate(`/${x.link}`)
                        }}>
                            <span className="material-symbols-outlined">{x.svg}</span>
                            <span >{x.name}</span>
                        </li>

                    ))
                }
            </ul>
            <div className="p-4 border-t border-purple-600 flex justify-center h-[10%]">
                <Button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                    name="Log Out" onClick={logout} />

            </div>

        </div>
    )
}
export default SideBar;