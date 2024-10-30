import { useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";

import { useNavigate } from "react-router-dom";
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate= useNavigate();
    const changeUsername = (e) => {
        console.log(e.target.value)
        setUsername(e.target.value)
    }
    const changePassoword = (e) => {
        setPassword(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handle = async () => {
        try {

            const form = {
                "username": username,
                "password": password,
                "email": email
            }
            const response = await fetch("http://localhost:5000/Register", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            const result = await response.json();
            if (result.success) {
               navigate("/login")
            }
        }
        catch (e) {
            console.log("error")
        }
        finally {
            setEmail("")
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

                <Input
                    type="email"
                    name="email"
                    value={email}
                    className={"border-2 rounded-md w-11/12 p-2 "}
                    onChange={changeEmail}
                    labelName="Email" />

                <Button
                    name="login"
                    buttonName={" text-white  font-bold bg-green-500 border-green-500  text-center p-0.5 border-2 w-1/4 h-full "}
                    onClick={handle} />
            </div>
        </>

    );
}
export default Register;
