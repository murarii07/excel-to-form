import UserDp from "../Atoms/userdp";
import { lazy, Suspense, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
// const ProfileDp = lazy(() => import("../Atoms/img"))

function Nav(props) {
    const [drop, setDrop] = useState(false);
    const [sideBarFlag, setSideBarFlag] = useState(false);

    const handleClickOutside = (e) => {
        console.log(sideBarFlag);
        if (sideBarFlag) setSideBarFlag(false);
    };
    const navigate= useNavigate()

    useEffect(() => {
        const handleClickOutsidee = () => {
            if (sideBarFlag) {
                setSideBarFlag(false);
                console.log(sideBarFlag, "a");
            }
            if (drop) { setDrop(false); }
        };

        document.querySelector("body").addEventListener("click", handleClickOutsidee);
        return () => {
            document.querySelector("body").removeEventListener("click", handleClickOutsidee);
        };
    }, [sideBarFlag, drop]);

    if (props.flag) {
        const userHandle = (e) => {
            console.log("true");
            setDrop(!drop);
            e.stopPropagation();
        };

        return (
            <>
                {sideBarFlag && <SideBar handle={handleClickOutside} />}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 navbar my-4 rounded-xl shadow-lg h-14 mx-auto w-[95%] relative px-4 transition-all duration-300 hover:shadow-xl">
                    <ul className="flex justify-between items-center h-full">
                        <li
                            className="cursor-pointer material-symbols-outlined text-white hover:text-purple-200 transition-colors duration-200 flex items-center text-2xl"
                            onClick={(e) => {
                                setSideBarFlag(true);
                                e.stopPropagation(); //this will prevent event bubbling
                            }}
                            aria-label="Open menu"
                        >
                            menu
                        </li>
                        <li className="text-xl font-bold text-white tracking-wide">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">FormX</span>
                        </li>
                        <div className="flex justify-around items-center h-full">
                            <li className="relative">
                                <div
                                    className="cursor-pointer text-white p-1 hover:bg-white/10 rounded-full transition-all duration-200"
                                    onClick={userHandle}
                                    aria-label="User menu"
                                >
                                    <div className="material-symbols-outlined flex items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-sm ">
                                        account_circle
                                    </div>
                                </div>
                            </li>
                            {drop && <UserDp />}
                        </div>
                    </ul>
                </div>
            </>
        );
    }
    else {
        return (
            <div className="mb-10 h-14 mx-auto rounded-lg shadow-md w-11/12 px-5 bg-white border border-gray-100">
                <ul className="flex justify-between items-center h-full">
                    <li className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">FormX</li>
                    <div className="flex justify-around items-center gap-2 h-full">
                        {[
                            {
                                name: "login",
                                href: "/login",
                                className: "hover:bg-purple-100 px-4 py-2 rounded-md transition-all duration-200 text-purple-700 font-medium"
                            },
                            {
                                name: "signup",
                                href: "/signup",
                                className: "bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-md text-white font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                            }
                        ].map((x, index) =>
                            <span
                                key={index}
                                onClick={(e)=>{
                                    navigate(x.href)
                                    e.stopPropagation()
                                }}
                                className={x.className}
                                
                            >
                                <li>{x.name}</li>
                            </span>
                        )}
                    </div>
                </ul>
            </div>
        );
    }
}

export default Nav;