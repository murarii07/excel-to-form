import { useSelector } from "react-redux";

function Nav(props){
    const flag=useSelector(state=>state.isLogin.value)
    console.log(flag)
    if(props.flag){

        return(
            <div className="navbar   mt-3 mb-10  rounded-md h-11 mx-auto  w-11/12">
            <ul className="flex justify-between items-center h-full"> 
                <li className="w-2/4 text-xl font-bold">FormX</li>
                <div className="flex w-2/4 justify-around items-center h-full">
               <li>userdp</li>
                </div>
            </ul>
        </div>
           
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