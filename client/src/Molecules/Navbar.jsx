import UserDp from "../Atoms/userdp";
import { lazy, Suspense, useEffect, useState } from "react";
import SideBar from "./SideBar";
const ProfileDp=lazy(()=>import("../Atoms/img"))
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
                <div className=" bg-purple-900 navbar    mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12  relative">
                    <ul className="flex justify-evenly items-center h-full  ">
                        <li className="w-1/5 cursor-pointer" onClick={(e) => {
                            setSideBarFlag(true)
                            e.stopPropagation() //this will prevent event bubbling
                        }}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                      </svg>
                      </li>
                        <li className="w-2/5 text-xl font-bold text-white">FormX</li>
                        <div className="flex w-2/5 justify-around  items-center h-full">
                           
                            <li className="relative"><div className="cursor-pointer text-white" onClick={userHandle} >
                                <div className="flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 dark:bg-gray-600 rounded-full">
                                    <Suspense fallback={<span>Loading...</span>}>
                                    <ProfileDp img="/assets/user.png" width={"24px"} height={"24px"}  />
                                    </Suspense>
                                   
                                
                                </div></div></li>
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
                    <li className="w-2/4 text-xl font-bold text-center">FormX</li>
                    <div className="flex w-2/4 justify-around items-center h-full">
                    {[{name:"login",href:"/login",className:"hover:bg-teal-100 p-3 rounded-md"},{name:"signup",href:"/signup",className:"hover:bg-teal-100 p-3 rounded-md"}].map((x,index)=>
                        <a  key={index}
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