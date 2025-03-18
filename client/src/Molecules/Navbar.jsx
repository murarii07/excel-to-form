import UserDp from "../Atoms/userdp";
import { lazy, Suspense, useEffect, useState } from "react";
import SideBar from "./SideBar";
// const ProfileDp = lazy(() => import("../Atoms/img"))
function Nav(props) {
    const [drop, setDrop] = useState(false);
    const [sideBarFlag, setSideBarFlag] = useState(false);
    const handleClickOutside = (e) => {
        console.log(sideBarFlag)
        if (sideBarFlag) setSideBarFlag(false);
    };


    useEffect(() => {
        const handleClickOutsidee = () => {
            if (sideBarFlag) {
                setSideBarFlag(false)
                console.log(sideBarFlag, "a")
            };
            if (drop) { setDrop(false) };
        };

        document.querySelector("body").addEventListener("click", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("click", handleClickOutsidee);
        };
    }, [sideBarFlag, drop]);
    if (props.flag) {
        const userHandle = (e) => {
            console.log("true")
            setDrop(!drop)
            e.stopPropagation();
        }
        return (
            <>
                {sideBarFlag && <SideBar handle={handleClickOutside} />}
                <div className=" bg-purple-600 navbar    mt-3   rounded-2xl h-12 mx-auto  w-[95%]  relative px-4 ">
                    <ul className="flex justify-between items-center h-full  ">
                        <li className=" cursor-pointer material-symbols-outlined text-white" onClick={(e) => {
                            setSideBarFlag(true)
                            e.stopPropagation() //this will prevent event bubbling
                        }}>menu
                        </li>
                        <li className="text-xl font-bold text-white">FormX</li>
                        <div className="flex justify-around  items-center h-full">

                            <li className="relative"><div className="cursor-pointer text-white" onClick={userHandle} >
                                <div className="material-symbols-outlined flex items-center justify-center w-6 h-6 overflow-hidden  rounded-full">
                                    account_circle
                                </div>

                            </div></li>
                            {drop && <UserDp />}
                        </div>
                    </ul>
                </div>
            </>

        )
    }
    else {
        return (
            <div className="navbar   mb-10   h-11 mx-auto  rounded-md w-11/12  px-5 ">
                <ul className="flex justify-between items-center h-full">
                    <li className=" text-xl font-bold text-center">FormX</li>
                    <div className="flex justify-around items-center h-full">
                        {[{ name: "login", href: "/login", className: "hover:bg-teal-100 p-3 rounded-md" }, { name: "signup", href: "/signup", className: "hover:bg-teal-100 p-3 rounded-md" }].map((x, index) =>
                            <a key={index}
                                href={x.href}
                                className={x.className} target="_blank" >
                                <li>{x.name}</li>
                            </a>
                        )}

                    </div>
                </ul>
            </div>
        )
    }
}
export default Nav;
