import { useEffect, useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeIsLoginValue } from "../redux/flag";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/fetchData";
import Nav from "../Molecules/Navbar";

const Login = () => {
    const [er, setEr] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { response, error, setOptions } = useFetchData("http://localhost:5000/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeUsername = useDebounce((e) => {
        console.log(e.target.value)
        if (e.target.value) {
            setUsername(e.target.value)
        }
    }, 500)

    const changePassoword = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setPassword(e.target.value)
        }
    }, 500);
    const handle = async () => {
        if (username && password) {
            const form = {
                "username": username,
                "password": password,
            }
            setOptions({ method: "POST", headers: { 'Content-Type': 'application/json', }, credentials: 'include', body: JSON.stringify(form) })
            setPassword("")
            setUsername("")
        }
    }

    //response render
    useEffect(() => {
        if (response && !error) {
            console.log(response)
            dispatch(changeIsLoginValue(true));
            window.localStorage.setItem("isLogged", true)
            navigate("/")
        }
    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            console.log("try again later")
        }
    }, [error])

    if (window.localStorage.getItem("isLogged")) {

        return (
            <div>you have already logged in return to<br></br> <a className="hover:text-blue-600 hover:text-underline" href="/">Home</a> </div>

        )
    }
    return (
        <>
            <div className="flex  w-full h-[100vh]  mx-auto gap-x-5 p-5 rounded-md shadow-md bg-white justify-between bg-gradient-to-r from-indigo-300 via-purple-200 to-purple-100  md:flex-nowrap flex-wrap">

                <div className=" w-full md:w-3/5  flex items-center justify-center h-2/4 md:h-full m-0  ">
                    <div className="w-[47%] "><div className="text-4xl font-extrabold mb-4 ">Sign In to Create Form</div> <div>if you dont have account &nbsp;<a className="text-purple-900 cursor-pointer font-bold" href="/signup">Register here</a></div></div>
                    <div className="w-[60%] h-[60%] flex items-end justify-end drop-shadow-xl animate-in slide-in-from-top-full duration-700">

                        <img src="assets/image copy 3.png" width={"90%"} height={"90%"} alt=""  />
                    </div>

                </div>
                <div className=" w-full md:w-2/6  p-2  h-2/4 md:h-full flex flex-col items-center justify-center gap-y-3 ">
                    <Input
                        type="text"
                        name="username"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={changeUsername}
                        labelName="Username" />
                    <Input
                        type="password"
                        name="password"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={changePassoword}
                        labelName="Password" />
                    <div className="text-sm hover:text-purple-900  cursor-pointer hover:font-medium w-11/12  ">forget Password?
                    </div>
                    <Button
                        name="login"
                        buttonName={" text-white  font-bold bg-purple-700   text-center p-0.5  w-10/12"}
                        onClick={handle} />
                        <div className="mt-5 mb-2">or Sign In With</div>
                    <div className="text-sm hover:text-green-500 cursor-pointer flex w-11/12 justify-evenly gap-10  min-h-10">
                        <div className="box w-2/5  rounded-md shadow-md text-center bg-white flex items-center justify-center" onClick={(e) => {
                        navigate("/signup")
                    }}>
                            <img src="assets/google.png" alt="" className="" width={"24px"} height={"20px"}/></div>
                        
                    </div>
                    {error && <div className="text-red-500 mx-auto">{error.message}</div>}
                </div>
            </div>
        </>

    );
}
export default Login;
