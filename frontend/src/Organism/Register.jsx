import { useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";

import { useNavigate } from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //debouncing 
    /*
     basically create a closure
     1.function of debounce(function,timer)
     2.save timoutId in a var of a outer func
     3.return a func in which  first clear the previous func using his id and set var =setTImout(function,timer)

    */
    function debounce(func, timer) {
        let timoutId;
        return (...ass) => {
            clearTimeout(timoutId);
            timoutId = setTimeout(() => func(...ass), timer)
        }
    }

    const changeUsername = debounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setUsername(e.target.value)
        }
    }, 500)
    const changePassoword = debounce((e) => {
        if (e.target.value) {
            // console.log(e.target.value)
            setPassword(e.target.value)
        }
    }, 500)
    const changeEmail = debounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setEmail(e.target.value)
        }
    }, 500)
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
            <div className="flex flex-col w-7/12  h-2/4 my-10 mx-auto border-2 gap-y-5 p-5 rounded-md bg-white">

                <Input
                    type="text"
                    name="username"

                    className={"border-2  w-11/12 p-2 "}
                    onChange={changeUsername}
                    labelName="Username" />

                <Input
                    type="password"
                    name="password"

                    className={"border-2  h-full w-11/12  p-2"}
                    onChange={changePassoword}
                    labelName="Password" />

                <Input
                    type="email"
                    name="email"

                    className={"border-2  w-11/12 p-2 "}
                    onChange={changeEmail}
                    labelName="Email" />

                <Button
                    name="Create Account"
                    buttonName={" text-white  font-bold bg-purple-600 border-purple-600  text-center text-md p-0.5 border-2 w-2/4 h-full "}
                    onClick={handle} />
            </div>
        </>

    );
}
export default Register;
