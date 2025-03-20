import { lazy, Suspense, useEffect, useState } from "react";
import Button from '../Atoms/Button';
import { useNavigate } from "react-router-dom";
import Nav from "../Molecules/Navbar";
import useFetchData from "../CustomHooks/useFetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
import { toast, ToastContainer } from "react-toastify";

// Lazy load the ProfileImg component
const ProfileImg = lazy(() => import("../Atoms/img"));

const Profile = () => {
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState({ 
        name: "df", 
        storage: 0, 
        forms: [], 
        email: "" 
    });
    
    const [response, error] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/details`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    });
    
    const [res, er, setLogoutOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/login`);
    
    function unitConversion(bytes) {
        // If >= 1MB, convert to MB, otherwise convert to KB
        let power = bytes >= 1024 * 1024 ? 2 : 1;
        const converted = bytes / (1024 ** power);
        return converted.toFixed(2);
    }
    
    // Calculate storage percentage
    const getStoragePercentage = () => {
        const maxStorage = 5 * 1024 * 1024 * 1024; // 5GB in bytes
        const percentage = (details.storage / maxStorage) * 100;
        return percentage < 1 ? 1 : Math.min(percentage, 100);
    };
    
    // Handle response data
    useEffect(() => {
        if (response && !error) {
            setDetails({
                forms: response.data.formlist,
                name: response.data.name,
                storage: response.data.storageInBytes,
                email: response.data.email
            });
            setIsLoading(false);
        } else if (error) {
            console.log(error);
            window.localStorage.removeItem("isLogged");
            nav("/login");
        }
    }, [response, error, nav]);
    
    const logout = async () => {
        setLogoutOptions({
            method: "DELETE",
            credentials: "include"
        });
    };
    
    const displayToast = (msg) => toast(msg);
    
    useEffect(() => {
        if (res && !er) {
            window.localStorage.removeItem("isLogged");
            displayToast("Successfully logged out");
            setTimeout(() => nav("/"), 2000);
        } else if (er) {
            displayToast("Something went wrong");
            console.log("Something went wrong");
        }
    }, [res, er, nav]);

    return (
        isLoading ? <SkeletonLoading /> :
        <>
            <Nav flag={true} />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-screen mx-auto bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-xl border-slate-700 p-6 transition-all duration-300 hover:shadow-2xl">
                    
                 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <Suspense fallback={
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                                    <span className="text-gray-400">Loading...</span>
                                </div>
                            }>
                                <ProfileImg 
                                    src="/assets/1.png"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg object-contain border-4 border-white ring-2 ring-purple-200 transition-transform duration-300 hover:scale-105"
                                    alt="Profile avatar" 
                                />
                            </Suspense>
                            <h2 className="font-bold text-2xl mt-4 text-center text-indigo-800">
                                My Profile
                            </h2>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-4 mt-4 md:mt-0 justify-center">
                            {/* Email Field */}
                            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                                <label htmlFor="email" className="font-semibold text-indigo-700 text-sm md:text-base w-28">
                                    Email:
                                </label>
                                <div id="email" className="w-full bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md text-gray-800 border border-purple-100">
                                    {details.email}
                                </div>
                            </div>
                            
                  
                            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                                <label htmlFor="username" className="font-semibold text-indigo-700 text-sm md:text-base w-28">
                                    Username:
                                </label>
                                <div id="username" className="w-full bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md text-gray-800 border border-purple-100">
                                    {details.name}
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="mt-10 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-5 shadow-md transition-all duration-300 hover:shadow-lg">
                        <details className="w-full group">
                            <summary className="flex justify-between items-center cursor-pointer">
                                <h3 className="font-semibold text-indigo-900 text-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xl bg-indigo-200 p-1 rounded-full text-indigo-700">
                                        list_alt
                                    </span>{' '}
                                    My Forms
                                </h3>
                                <span className="material-symbols-outlined text-indigo-500 text-2xl transform transition-transform duration-300 group-open:rotate-45">
                                    add
                                </span>
                            </summary>
                            <div className="mt-4 pl-4 border-l-2 border-indigo-200">
                                {details.forms.length ? (
                                    <ul className="space-y-3">
                                        {details.forms.map((formName, index) => (
                                            <li 
                                                key={index} 
                                                onClick={() => nav(`/tasks/${formName}`)}
                                                className="text-gray-700 p-2 pl-4 hover:bg-white/60 rounded-lg transition-colors duration-200 cursor-pointer flex items-center"
                                            >
                                                <span className="h-6 w-6 flex items-center justify-center bg-indigo-200 text-indigo-700 rounded-full mr-3 text-xs font-bold">
                                                    {index + 1}
                                                </span>
                                                <span className="font-medium">{formName} Form</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic p-2">No forms created yet</p>
                                )}
                            </div>
                        </details>
                    </div>

               
                    <div className="mt-10">
                        <div className="flex justify-between items-center mb-2 text-sm md:text-base">
                            <span className="font-medium text-gray-700 flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-500">
                                    cloud
                                </span>
                                Storage Used
                            </span>
                            <span className="text-indigo-700 font-semibold">
                                {unitConversion(details.storage)}{details.storage >= 1024 * 1024 ? 'MB' : 'KB'}/5GB
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden border-2 border-neutral-200">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-in-out"
                                style={{ width: `${getStoragePercentage()}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-right mt-1 text-gray-500">
                            {getStoragePercentage().toFixed(2)}% used
                        </p>
                    </div>

                   
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Button
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={logout}
                            name="Logout"
                        />
                        <Button
                            className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-red-800 hover:to-red-900 transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                            name="Delete Account" 
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;