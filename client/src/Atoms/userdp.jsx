import { useNavigate } from "react-router-dom";
import Button from "./Button"

const UserDp=()=>{
    const nav=useNavigate();
    const logout = async () => {
        const res = await fetch("http://localhost:5000/login", {
            method: "DELETE",
            credentials: "include" // Sends cookies with the request
        });
        if (res.ok) {
            console.log("sd")
            window.localStorage.removeItem("isLogged")
            nav("/")

        }
        else {
            alert("something went wrong try again")
        }
    }

    return(
        <div className="border-2 border-purple-100 rounded-xl w-60 flex flex-col justify-center gap-2 box-border min-h-32  shadow-md absolute top-10 right-2 bg-purple-50 shadow-purple-100">
          <div className="px-5 border-b-2 border-purple-100 ">
            <a href="http://localhost:3000/my-profile" target="_blank" rel="noopener noreferrer">My Account</a>
            </div>
            <div className="px-5 border-b-2 border-purple-100 ">Storage</div>
            <div className="px-5 "><Button name="logout" buttonName={"bg-red-500 border-2 border-red-500 text-white p-1"} onClick={logout} /></div>
        </div>
    )
}
export default UserDp