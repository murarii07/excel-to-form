import { useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeIsLoginValue } from "../redux/flag";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch=useDispatch();

    const navigate= useNavigate();
    const changeUsername = (e) => {
        console.log(e.target.value)
        setUsername(e.target.value)
    }
    const changePassoword = (e) => {
        setPassword(e.target.value)
    }
    const handle = async () => {
        try {

            const form = {
                "username": username,
                "password": password,
            }
            const response = await fetch("http://localhost:5000/login", { method: "POST", headers: { 'Content-Type': 'application/json' , },  credentials: 'include', body: JSON.stringify(form) })
            const result = await response.json();
            if (result.success) {
                console.log(result)
                dispatch(changeIsLoginValue(true));
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
    return (
        <>
            <div className="flex flex-col w-7/12  h-2/4 my-10 mx-auto border-2 gap-y-5 p-5 rounded-md shadow-md">

                <Input
                    type="text"
                    name="username"
                    value={username}
                    className={"border-2  w-11/12 p-2 "}
                    onChange={changeUsername}
                    labelName="Username" />

                <Input
                    type="password"
                    name="password"
                    value={password}
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
