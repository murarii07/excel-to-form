import Button from "../Atoms/Button";
import Nav from "../Molecules/Navbar";
import Input from "../Atoms/Input";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../CustomHooks/debounce";
import useFetchData from "../CustomHooks/fetchData";
import SkeletonLoading from "../Atoms/SkeletionLoading";
import { lazy } from "react";
const Img=lazy(()=>import('../Atoms/img'))
const MyTask = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [formList, setFormList] = useState([]);
    const navigate = useNavigate();
    const { response, error } = useFetchData("http://localhost:5000/user/formlist", {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    })
    const [formListFilter, setFormListFilter] = useState(formList);
    const debounceHandler = useDebounce((e) => {
        console.log(e.target.value)
        if (formList.length) {
            if (e.target.value != null) {
                let arr = formList.filter(x => x.includes(e.target.value));
                setFormListFilter(arr);
                // fetchw()
            }
            else {
                setFormListFilter(formList)
            }
        }
    }, 500)

    //response render
    useEffect(() => {
        if (response && !error) {
            setFormListFilter(response.data.formlist);
            setFormList(response.data.formlist);
            console.log(response);
            setIsLoading(false)
        }
    }, [response])

    //error render
    useEffect(() => {
        if (error) {
            setIsLoading(false)
            console.log("Error fetching form list:", error);
            window.localStorage.removeItem("isLogged")
            navigate("/login")
        }
    }, [error])


    return (
        
            isLoading ? (<SkeletonLoading />) :(
                <>
                    <Nav flag={true} />
                    {/* <Button buttonName="filter"  name="filter" /> */}
                    <div className="search mx-auto w-11/12 h-14 box-border flex items-center gap-3.5 ">
                        <Input
                            className="box-border border-2  h-full px-3 w-7/12 border-black bg-transparent "
                            placeholder="enter form name or id" onChange={debounceHandler} />
                        <Button buttonName="search font-bold rounded-xl px-3 h-11/12 border-teal-500  text-teal-500 hover:bg-teal-500 hover:text-white " name="search" />
                    </div>
                    <div className="form-container  mx-auto my-4 box-border w-11/12 px-5 py-5 flex gap-10 flex-wrap  bg-purple-100 rounded-md ">
                        <div className="box-border min-w-20 min-h-28 flex flex-col gap-y-3 items-center ">
                            <div className="bg-teal-100 img  border-teal-100  border-2 w-full min-h-24 text-teal-800 box-border text-3xl flex items-center justify-center rounded-md shadow-md  ">+</div>
                            <div className="caption cursor-pointer" onClick={(e) => {
                                navigate("/")
                                e.stopPropagation();
                            }}>New form</div>
                        </div>

                        {formListFilter.map((x, index) => (
                            <div className=" box-border min-w-20 min-h-28 flex flex-col gap-y-3 items-center " key={index}>
                                <div className="bg-teal-50 img  border-2 border-teal-50 w-full min-h-24 text-teal-800 box-border text-xl flex items-center justify-center rounded-md shadow-md ">
                                <Suspense fallback={<div>"loading...</div>}  >
                                    <Img img="/assets/s.png" width={"90px"} />
                                </Suspense>
                                    
                                </div>
                                <div className="caption hover:text-blue-500 cursor-pointer hover:underline" onClick={(e) => {
                                    navigate(x)
                                    e.stopPropagation();
                                }}>{x}</div>
                            </div>
                        ))}

                    </div>
                </>)
        
    );
}


export default MyTask