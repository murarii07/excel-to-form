import { useEffect, useState } from "react";
import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeIsLoginValue } from "../redux/flag";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/useFetchData";
import InputField from "../Atoms/inputField";
import Label from "../Atoms/Label";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/login`);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeUsername = useDebounce((e) => {
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

    useEffect(() => {
        if (response && !error) {
            console.log(response);
            dispatch(changeIsLoginValue(true));
            window.localStorage.setItem("isLogged", true);
            navigate("/");
        } else if (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again later.");
        }
    }, [response, error]);

    if (window.localStorage.getItem("isLogged")) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 to-slate-100 p-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center space-y-4 animate-fade-in">
                    <div className="text-lg font-medium text-gray-800">You are already logged in</div>
                    <a 
                        href="/" 
                        className="inline-block text-violet-600 font-medium hover:text-violet-800 transition-colors duration-300 underline-offset-4 hover:underline"
                    >
                        <span className="material-symbols-outlined">Home</span>
                        Return to Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8 h-full flex items-center">
                <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Left Content Side */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 relative">
                        <div className="max-w-lg">
                            <h1 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in">
                                Sign In to Create Form
                            </h1>
                            <p className="text-gray-600 mb-8 animate-fade-in-delayed">
                                Don't have an account? {" "}
                                <a 
                                    className="text-violet-600 font-semibold hover:text-violet-800 transition-colors duration-300 underline-offset-4 hover:underline" 
                                    href="/signup"
                                >
                                    Register here
                                </a>
                            </p>
                            
                            <div className="relative mt-8 hidden md:block 
animate-in slide-in-from-top-full duration-700">
                                <div className="absolute -top-12 -left-6 w-24 h-24 bg-violet-100 rounded-full opacity-70"></div>
                                <div className="absolute -bottom-16 -right-12 w-32 h-32 bg-indigo-100 rounded-full opacity-70 "></div>
                                <img 
                                    src="assets/imagecopy3.png" 
                                    alt="Form illustration" 
                                    className="relative z-10 w-full max-w-md mx-auto"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Form Side */}
                    <div className="w-full md:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-800 p-8 md:p-12 flex flex-col justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-6">Welcome Back</h2>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor={"username"} className="text-white" labelname={"Username"}
                                    required={true} />
                            
                                    <InputField
                                        type="text"
                                        name="username"
                                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                        onChange={changeUsername}
                                        placeholder="Enter your username"
                                    />

                                </div>
                                
                                <div className="space-y-2">
                                <Label htmlFor={"password"} className="text-white" labelname={"Password"}
                                    required={true} />
                                    <InputField
                                        type="password"
                                        name="password"
                                        className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                        onChange={changePassoword}
                                        placeholder="Enter your password"
                                    />

                                </div>
                                
                                <div className="text-right">
                                    <button 
                                        className="text-white/80 text-sm hover:text-white transition-colors duration-300 focus:outline-none"
                                        aria-label="Forgot Password"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                
                                <div>
                                    <Button
                                        name="login"
                                        buttonName="w-full bg-white text-violet-700 font-semibold py-3 px-4 rounded-lg hover:bg-indigo-100 active:bg-indigo-200 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={handle}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                                
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/30"></div>
                                    </div>
                                    {/* <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gradient-to-br from-violet-600 to-indigo-800 text-white/80">
                                            or Sign In With
                                        </span>
                                    </div> */}
                                </div>
                                
                                {/* <div className="flex justify-center">
                                    <button 
                                        className="flex items-center justify-center bg-white rounded-lg px-6 py-2 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                                        onClick={() => navigate("/signup")}
                                        aria-label="Sign in with Google"
                                    >
                                        <img 
                                            src="assets/google.png" 
                                            alt="Google logo" 
                                            className="w-6 h-6 mr-2" 
                                        />
                                        <span className="text-gray-800 font-medium">Google</span>
                                    </button>
                                </div> */}
                                
                                {error && (
                                    <div className="bg-red-500/20 text-white p-3 rounded-lg text-center text-sm animate-pulse">
                                        {error.message || "Login failed. Please try again."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
