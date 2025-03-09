import { useState, useEffect, Suspense } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
import Label from '../Atoms/Label';
import InputField from "../Atoms/inputField";
import useFetchData from "../CustomHooks/useFetchData";
const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({ psw: "", error: false });
    const [email, setEmail] = useState("");
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/Register`);
    const changeUsername = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setUsername(e.target.value)
        }
    }, 500)
    const changePsw = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            if (!(/^.{8,}$/.test(e.target.value))) {
                console.log()
                setPassword({ ...password, psw: e.target.value, error: "least upto 8 charcter" })
                return
            }
            const r = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$/.test(e.target.value)
            if (!r) {
                console.log("pattern must contain uppercase,lowercase,digits,special characters")
                setPassword({ ...password, psw: e.target.value, error: "pattern must contain uppercase,lowercase,digits,special characters " })
                return
            }
            setPassword({ ...password, psw: e.target.value, error: false })
        }
    }, 500)

    const confirmPsw = useDebounce((e) => {
        if (e.target.value) {
            if (!(password.psw === e.target.value)) {
                console.log("passowrd does not match")
            }
        }
    }, 500)
    const changeEmail = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setEmail(e.target.value)
        }
    }, 500)
    const handle = async () => {
        console.log(1)
        if (username && password && email) {
            const form = {
                "username": username,
                "password": password.psw,
                "email": email
            }
            setOptions({ method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            setEmail("")
            setPassword({ psw: "", error: false })
            setUsername("")
        }
    }
    //response render
    useEffect(() => {
        if (response && !error) {
            navigate("/login")
        }
        else if (error) {
            console.log(error)
        }
    }, [response, error])


    return (
        <>
            <div className="flex  w-full min-h-full gap-5 p-5  shadow-md bg-white justify-between bg-gradient-to-r from-purple-300 via-purple-200 to-indigo-100  flex-col md:flex-row  border-2">
                <div className=" w-full md:w-3/5  flex items-center justify-center h-2/5 md:h-full    ">
                    <div className="w-[47%]  "><div className="text-4xl font-extrabold mb-4  ">Sign In to Create Form</div> <div>if you  have account &nbsp;<a className="text-purple-900 cursor-pointer font-bold" href="/login">Login here</a></div></div>
                    <div className="w-[60%] h-[100%] flex items-end justify-end drop-shadow-xl  ">
                        <Suspense fallback={<span>loading....</span>}>
                            <img src="assets/register.png" className=" w-[90%] h-[90%]" alt="" />
                        </Suspense>
                    </div>

                </div>
                <div className=" w-full md:w-2/6  px-3 h-3/5 md:h-[100vh] flex flex-col items-center justify-center gap-y-3 ">

                    <Label htmlFor={"username"} labelname="Create a username" />
                    <InputField
                        type="text"
                        name="username"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={changeUsername}
                    />

                    <Label htmlFor={"Email"} labelname="Email" />
                    <InputField
                        type="email"
                        name="email"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={changeEmail}
                    />
                    <Label htmlFor={"password"} labelname="Create Password" />
                    <InputField
                        type="password"
                        name="password"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={changePsw}
                    // element={<div className="text-red-500 text-sm">{password.error}</div>}
                    />
                    <Label htmlFor={"confirmPsw"} labelname="Confirm Password" />
                    <InputField
                        type="password"
                        name="confirmPsw"
                        className={"bg-sky-50 border-sky-50 border-2 shadow-sm w-11/12  p-2 rounded-md"}
                        onChange={confirmPsw}
                    />

                    <Button
                        name="Create Account"
                        buttonName={" text-white  font-bold bg-purple-700   text-center p-0.5  w-10/12"}
                        onClick={handle} />
                    <div className="mt-5 mb-5">or Sign Up With</div>
                    <div className="text-sm hover:text-green-500 cursor-pointer flex w-11/12 justify-evenly gap-10  min-h-10">
                        <div className="box w-2/5  rounded-md shadow-md text-center bg-white flex items-center justify-center" onClick={(e) => {
                            navigate("/signup")
                        }}>
                            <img img="assets/google.png" alt="" className="" width={"24px"} height={"20px"} />
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}
export default Register;
