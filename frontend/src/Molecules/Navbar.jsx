import UserDp from "../Atoms/userdp";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";

function Nav(props) {
    const [drop, setDrop] = useState(false);
    const [sideBarFlag, setSideBarFlag] = useState(false);
    const handleClickOutside = (e) => {
        console.log(sideBarFlag)
        if (sideBarFlag) setSideBarFlag(false);
    };


    useEffect(() => {
        const handleClickOutsidee = () => {
            console.log(sideBarFlag, "a")
            if (sideBarFlag) { setSideBarFlag(false) };
            if (drop) { setDrop(false) };
        };

        document.querySelector("body").addEventListener("click", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("click", handleClickOutsidee);
        };
    }, [sideBarFlag,drop]);
    if (props.flag) {
        const userHandle = (e) => {
            console.log("true")
            setDrop(true)
            e.stopPropagation();
        }
        return (
            <>
                {sideBarFlag && <SideBar handle={handleClickOutside} />}
                <div className="bg-purple-900 navbar    mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12  relative">
                    <ul className="flex justify-evenly items-center h-full ">
                        <li className="w-1/5" onClick={(e) => {
                            setSideBarFlag(true)
                            e.stopPropagation() //this will prevent event bubbling
                        }}><img src="/assets/layout.png" alt="" width={"40px"} height={"40px"} /></li>
                        <li className="w-2/5 text-xl font-bold text-white">FormX</li>
                        <div className="flex w-2/5 justify-around  items-center h-full">
                            {/* <li><div>{props.userName}</div></li> */}
                            <li className="relative"><div className="cursor-pointer text-white" onClick={userHandle} >Userdp</div></li>
                            {drop && <UserDp />}
                        </div>
                    </ul>
                </div>
            </>

        )
    }
    else {
        return (
            <div className="navbar   mb-10   h-11 mx-auto  rounded-md w-11/12 bg-teal-500 px-5 shadow-md">
                <ul className="flex justify-between items-center h-full">
                    <li className="w-2/4 text-xl font-bold text-center">FormX</li>
                    <div className="flex w-2/4 justify-around items-center h-full">
                        <li className="hover:bg-teal-100 p-3 rounded-md"><a href="/login" target="_blank">login</a></li>
                        <li className="hover:bg-teal-100 p-3 rounded-md"><a href="/signup" target="_blank">signup</a></li>
                    </div>
                </ul>
            </div>
        )
    }
}
export default Nav;