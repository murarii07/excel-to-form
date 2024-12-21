import { useEffect, useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeIsLoginValue } from "../redux/flag";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/fetchData";

const Login = () => {
    const [er,setEr]=useState(false)
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
        if(username && password){
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
            <div className="flex flex-col w-7/12  h-2/4 my-10 mx-auto border-2 gap-y-5 p-5 rounded-md shadow-md bg-white">

                <Input
                    type="text"
                    name="username"
                    className={"border-2  w-11/12 p-2 bg-transparent"}
                    onChange={changeUsername}
                    labelName="Username" />

                <Input
                    type="password"
                    name="password"
                    className={"border-2 h-full w-11/12  p-2 bg-transparent"}
                    onChange={changePassoword}
                    labelName="Password" />
                <div className="text-sm hover:text-purple-900  cursor-pointer hover:font-medium">forget Password?</div>
                <Button
                    name="login"
                    buttonName={" text-white  font-bold bg-teal-700  border-teal-700 text-center p-0.5 border-2 w-1/4 h-full "}
                    onClick={handle} />

                <div className="text-sm hover:text-green-500 cursor-pointer" onClick={() => {
                    navigate("/signup")
                }}>Create Account</div>
            </div>
            {error && <div className="text-red-500 mx-auto">{error.message}</div>}
        </>

    );
}
export default Login;
