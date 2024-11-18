import { useState,useEffect } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import useFetchData from "../CustomHooks/fetchData";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { response, error, setOptions } = useFetchData("http://localhost:5000/Register");
    const changeUsername = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setUsername(e.target.value)
        }
    }, 500)
    const changePassoword = useDebounce((e) => {
        if (e.target.value) {
            // console.log(e.target.value)
            setPassword(e.target.value)
        }
    }, 500)
    const changeEmail = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setEmail(e.target.value)
        }
    }, 500)
    const handle = async () => {
        const form = {
            "username": username,
            "password": password,
            "email": email
        }
        setOptions({ method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        setEmail("")
        setPassword("")
        setUsername("")
    }
    //response render
    useEffect(() => {
        if (response && !error) {
            navigate("/login")
        }
    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            console.log("try again later")
        }
    }, [error])


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
