import { useState, useEffect, Suspense } from "react";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
import Label from '../Atoms/Label';
import InputField from "../Atoms/inputField";
import useFetchData from "../CustomHooks/useFetchData";
import { string } from 'yup'

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState({ psw: "", error: "" });
    const [email, setEmail] = useState({ email: "", error: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [passowordMatch,setPasswordMatch]=useState(false);
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/Register`);

    const passwordSchema = string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/\d/, "Must contain at least one number")
        .matches(/[@$!%*?&_]/, "Must contain at least one special character (@$!%*?&_)")
        .required("Password is required");

    const emailSchema = string()
        .email("Invalid email")
        .required("Email is required");

    const changeUsername = useDebounce((e) => {
        if (e.target.value) {
            console.log(e.target.value)
            setUsername(e.target.value)
        }
    }, 500);

    const changePsw = useDebounce(async (e) => {
        if (e.target.value) {
            console.log(e.target.value)
            try {
                await passwordSchema.validate(e.target.value);
                setPassword({ psw: e.target.value, error: "" }); // No errors
            } catch (err) {
                setPassword({ psw: e.target.value, error: err.message }); // Set error message from Yup
            }
        }
    }, 500);

    const confirmPsw = useDebounce((e) => {
        if (e.target.value) {
            if (!(password.psw === e.target.value)) {
                setPasswordMatch(false)
                console.log("password does not match")
            }
            else{
                setPasswordMatch(true)
            }
        }
    }, 500);

    const changeEmail = useDebounce(async (e) => {
        if (e.target.value) {
            try {
                await emailSchema.validate(e.target.value)
                setEmail({ email: e.target.value, error: "" })
            }
            catch (err) {
                setEmail({ email: e.target.value, error: err.message })
            }
        }
    }, 500);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const checkPassowrdMatch = () => {
    //     setShowPasswor;
    // };
    const handle = async () => {
        console.log(1)
        if (username && password.psw && email.email) {
            const form = {
                "username": username,
                "password": password.psw,
                "email": email.email
            }
            setOptions({ method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            setEmail({ email: "", error: "" })
            setPassword({ psw: "", error: "" })
            setUsername("")
        }
    }

    useEffect(() => {
        if (response && !error) {
            navigate("/login")
        }
        else if (error) {
            console.log(error)
        }
    }, [response, error])

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col md:flex-row">
                {/* Left side - Image and Text */}
                <div className="w-full md:w-3/5 bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Create Your Account</h1>
                        <p className="text-violet-100 text-lg max-w-md">Join our platform to create custom forms and collect data efficiently.</p>

                        <div className="mt-8">
                            <p className="text-violet-200">Already have an account?</p>
                            <a
                                href="/login"
                                className="inline-block mt-2 text-white font-semibold border-b-2 border-violet-300 hover:border-white transition-colors duration-300"
                                aria-label="Go to login page"
                            >
                                Sign in instead
                            </a>
                        </div>
                    </div>

                    <div className="relative z-10 flex justify-center md:justify-end mt-8 md:mt-0">
                        <Suspense fallback={<div className="animate-pulse bg-violet-300/20 rounded-lg h-64 w-64"></div>}>
                            <img
                                src="assets/register.png"
                                className="w-56 h-auto object-contain drop-shadow-lg transform transition-transform hover:scale-105 duration-500"
                                alt="Registration illustration"
                            />
                        </Suspense>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="w-full md:w-2/5 p-8">
                    <div className="w-full max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="username"
                                    labelname="Username"
                                    className="block text-sm font-medium text-gray-700"
                                    required={true}
                                />
                                <InputField
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Choose a username"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50"
                                    onChange={changeUsername}

                                />
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    labelname="Email"
                                    className="block text-sm font-medium text-gray-700"
                                    required={true}
                                />
                                <InputField
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50"
                                    onChange={changeEmail}

                                />
                                {email.error && (
                                    <p className="text-sm text-red-600 mt-1" role="alert">{email.error}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    labelname="Password"
                                    className="block text-sm font-medium text-gray-700"
                                    required={true}
                                />
                                <div className="relative">
                                    <InputField
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Create a secure password"
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50"
                                        onChange={changePsw}

                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-violet-500 focus:outline-none"
                                        onClick={toggleShowPassword}
                                       
                                    >
                                        {showPassword ? (
                                            <span class="material-symbols-outlined">
                                            visibility
                                            </span>
                                        ) : (
                                            <span class="material-symbols-outlined">
                                            visibility_off
                                            </span>
                                        )}
                                    </button>
                                </div>
                                {password.error && (
                                    <p className="text-sm text-red-600 mt-1" role="alert">{password.error}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="confirmPsw"
                                    labelname="Confirm Password"
                                    className="block text-sm font-medium text-gray-700"
                                />
                                <div className="relative">
                                    <InputField
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPsw"
                                        id="confirmPsw"
                                        placeholder="Confirm your password"
                                        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 bg-gray-50"
                                        onChange={confirmPsw}

                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-violet-500 focus:outline-none"
                                    >
                                        {passowordMatch? (
                                            <span class="material-symbols-outlined text-green-500">
                                            check
                                            </span>
                                        ) : (
                                            <span class="material-symbols-outlined text-red-600">
                                            {password.psw && confirmPsw?"close":""}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                            
                                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02]"
                                    onClick={handle}
                                    title="Create your account"
                                >Create Account</button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or continue with</span>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                {/* <button
                                    type="button"
                                    className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                                    onClick={() => navigate("/signup")}
                                    aria-label="Sign up with Google"
                                >
                                    <img src="assets/google.png" alt="Google logo" className="w-6 h-6 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">Google</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;