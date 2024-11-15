import Button from "../Atoms/Button";
import Nav from "../Molecules/Navbar";
import Input from "../Atoms/Input";
import { useEffect, useState } from "react";
import { fetchData } from "../fetchData";
import { Navigate } from "react-router-dom";
const MyTask = () => {
    const [error, setError] = useState(false)
    const [formList, setFormList] = useState([]);
    const [formListFilter, setFormListFilter] = useState(formList);


    //closure of debounce named function
    function debounce(func, timer) {
        let timoutId;
        return (...args) => {
            clearTimeout(timoutId);
            timoutId = setTimeout(()=>func(...args), timer)
        }
    }

    const debounceHandler = debounce((e) => {
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


    useEffect(() => {
        const fetchFormList = async () => {
            try {
                const res = await fetchData("http://localhost:5000/user/formlist", {
                    method: "GET",
                    credentials: "include" // Sends cookies with the request
                });
                if (!res.success) {
                    setError(true);
                    return;
                }
                setFormListFilter(res.data.formlist);
                setFormList(res.data.formlist);
                console.log(res);
            } catch (e) {
                console.log("Error fetching form list:", e);
                setError(true);
            }
        };

        fetchFormList();
    }, []);



    if (error) {
        window.localStorage.removeItem("isLogged")
        return <Navigate to="/login" />
    }
    else {
        return (
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
                        <div className="caption"><a href="http://localhost:3000/">New form</a></div>
                    </div>

                    {formListFilter.map((x, index) => (
                        <div className=" box-border min-w-20 min-h-28 flex flex-col gap-y-3 items-center " key={index}>
                            <div className="bg-teal-100 img  border-2 border-teal-100 w-full min-h-24 text-teal-800 box-border text-xl flex items-center justify-center rounded-md shadow-md ">Image</div>
                            <a className="caption hover:text-blue-500 cursor-pointer hover:underline" href={`/tasks/${x}`}>{x}</a>
                        </div>
                    ))}

                </div>
            </>
        );
    }

}
export default MyTask