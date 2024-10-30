import { useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";

import { useNavigate } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
            <div className="flex flex-col w-7/12  h-2/4 my-10 mx-auto border-2 gap-y-5 p-5 rounded-md">

                <Input
                    type="text"
                    name="username"
                    value={username}
                    className={"border-2 rounded-md  w-11/12 p-2 "}
                    onChange={changeUsername}
                    labelName="Username" />

                <Input
                    type="password"
                    name="password"
                    value={password}
                    className={"border-2 rounded-md h-full w-11/12  p-2"}
                    onChange={changePassoword}
                    labelName="Password" />

                <Button
                    name="login"
                    buttonName={" text-white  font-bold bg-green-500 border-green-500  text-center p-0.5 border-2 w-1/4 h-full "}
                    onClick={handle} />
            </div>
        </>

    );
}
export default Login;
