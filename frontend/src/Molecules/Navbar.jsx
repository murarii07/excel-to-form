import { useSelector } from "react-redux";
import UserDp from "../Atoms/userdp";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";

function Nav(props){
    const [drop,setDrop]=useState(false);
    const [sideBarFlag,setSideBarFlag]=useState(false);
    const handleClickOutside = () => {
                console.log(sideBarFlag)
                if (sideBarFlag) setSideBarFlag(false);
            };

    // useEffect(() => {
    //     const handleClickOutside = () => {
    //         console.log(sideBarFlag)
    //         if (sideBarFlag) setSideBarFlag(false);
    //     };

    //     document.body.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.body.removeEventListener("click", handleClickOutside);
    //     };
    // }, [sideBarFlag]);
    if(props.flag){
        const userHandle=()=>{
            console.log("true")
            setDrop(!drop)
        }
        return(
            <>
           {sideBarFlag && <SideBar handle={handleClickOutside} />}
            <div className="navbar    mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12  relative">
            <ul className="flex justify-evenly items-center h-full"> 
                <li className="w-1/5" onClick={()=>{
                    setSideBarFlag(true)
                }}><img src="/assets/layout.png" alt=""   width={"40px"} height={"40px"}/></li>
                <li className="w-2/5 text-xl font-bold">FormX</li>
                <div className="flex w-2/5 justify-around  items-center h-full">
               {/* <li><div>{props.userName}</div></li> */}
               <li className="relative"><div className="cursor-pointer" onClick={userHandle} >Userdp</div></li>
       {drop && <UserDp />}
                </div>
            </ul>
        </div>
            </>
           
        )
    }
    else{
        return(
            <div className="navbar   mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12">
                <ul className="flex justify-between items-center h-full"> 
                    <li className="w-2/4 text-xl font-bold">FormX</li>
                    <div className="flex w-2/4 justify-around items-center h-full">
                    <li className="hover:bg-purple-100 p-3 rounded-md"><a href="/login" target="_blank">login</a></li>
                    <li className="hover:bg-purple-100 p-3 rounded-md"><a href="/signup" target="_blank">signup</a></li>
                    </div>
                </ul>
            </div>
        )
    }
}
export default Nav;