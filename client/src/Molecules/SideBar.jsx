import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
function SideBar({ handle }) {
    const navigate = useNavigate();
    const [ar] = useState([
        { name: "MyAccount", link: "my-profile", iconName: "person" },
        { name: "Mytasks", link: "tasks", iconName: "task" },
        { name: "Home", link: "", iconName: "Home" }
    ])
    const logout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/login`, {
                method: "DELETE",
                credentials: "include"
            });

            const response = await res.json();
            if (response.success) {
                window.localStorage.removeItem("isLogged");
                toast.success("Logged out successfully!");

                if (window.location.pathname === "/") {
                    window.location.reload();
                } else {
                    navigate("/", { replace: true });
                }
                return;
            }

            toast.error("Something went wrong. Try again.");
        } catch (e) {
            toast.error("Something went wrong. Try again.");
            console.error("Logout Error:", e);
        }
    };



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
                            <span className="material-symbols-outlined">{x.iconName}</span>
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