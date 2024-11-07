import { useSelector } from "react-redux";
import UserDp from "../Atoms/userdp";
import { useState } from "react";

function Nav(props){
    const [drop,setDrop]=useState(false);
    const flag=useSelector(state=>state.isLogin.value)
    console.log(flag)
    if(props.flag){
        const userHandle=()=>{
            console.log("true")
            setDrop(!drop)
        }
        return(
            <>
            <div className="navbar   mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12  relative">
            <ul className="flex justify-between items-center h-full"> 
                <li className="w-2/4 text-xl font-bold">FormX</li>
                <div className="flex w-2/4 justify-around  items-center h-full">
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