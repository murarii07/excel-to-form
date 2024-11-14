import { useEffect, useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeIsLoginValue } from "../redux/flag";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    //closure for debouncing
    function debounceF(func, timer) {
        let timoutId;
        return (...args) => {
            clearTimeout(timoutId);
            timoutId = setTimeout(() => func(...args), timer)
        }
    }
    const changeUsername = debounceF((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setUsername(e.target.value)
        }
    }, 500)
    const changePassoword = debounceF((e) => {
        if (e.target.value) {
            setPassword(e.target.value)
        }
    }, 500);
    const handle = async () => {
        try {

            const form = {
                "username": username,
                "password": password,
            }
            const response = await fetch("http://localhost:5000/login", { method: "POST", headers: { 'Content-Type': 'application/json', }, credentials: 'include', body: JSON.stringify(form) })
            const result = await response.json();
            if (result.success) {
                console.log(result)
                dispatch(changeIsLoginValue(true));
                window.localStorage.setItem("isLogged", true)
                navigate("/")
            }
        }
        catch (e) {
            console.log("error")
        }
        finally {
            setPassword("")
            setUsername("")
        }

    }
    if (window.localStorage.getItem("isLogged")) {

        return (
            <div>you have already logged in return to<br></br> <a className="hover:text-blue-600 hover:text-underline" href="/">Home</a> </div>

        )
    }
    return (
        <>
            <div className="flex flex-col w-7/12  h-2/4 my-10 mx-auto border-2 gap-y-5 p-5 rounded-md shadow-md">

                <Input
                    type="text"
                    name="username"
                    className={"border-2  w-11/12 p-2 "}
                    onChange={changeUsername}
                    labelName="Username" />

                <Input
                    type="password"
                    name="password"
                    className={"border-2 h-full w-11/12  p-2"}
                    onChange={changePassoword}
                    labelName="Password" />
                <div className="text-sm hover:text-purple-900  cursor-pointer hover:font-medium">forget Password?</div>
                <Button
                    name="login"
                    buttonName={" text-white  font-bold bg-teal-700  border-teal-700 text-center p-0.5 border-2 w-1/4 h-full "}
                    onClick={handle} />

                <div className="text-sm hover:text-green-500 cursor-pointer">Create Account</div>
            </div>
        </>

    );
}
export default Login;
