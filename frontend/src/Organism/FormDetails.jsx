import { useEffect, useState } from "react";
import Button from "../Atoms/Button";
import { Navigate } from "react-router-dom";
import { fetchData } from "../fetchData";
import Nav from "../Molecules/Navbar";

const FormDetails=()=>{
    const [er,setEr]=useState(false)
    const [form,setForm]=useState({name:"temp",link:"adsd",description:"this is form detials "})
    // useEffect(()=>{
    //     const fet=async ()=>{

    //         try{
                
    //             const res=await fetchData("http://localhost:5000/user/formlist",{
    //                 method: "GET",
    //                 credentials: "include" // Sends cookies with the request
    //             })
    //             if(!res.success){
    //                 setEr(true)
    //             }
    //             setForm(res.data[0])
    //         }catch(e){
    //             setEr(true)
    //         }
    //     }
    //     fet()

    // },[])
    const deleteHandle=async ()=>{
             try{

            const res=await fetchData(`http://localhost:5000/user/delete/${form.name}`,{
                method: "DELETE",
                credentials: "include" // Sends cookies with the request
            })
            if(res.success){
                alert("successfully deleted")
            }
            else{
                alert("deletion failed")
            }
        }catch(e){
            alert(" error something went wrong")
        }

    }
    if(er){
        return<Navigate to="/error" />
    }
    else{
        return(
            <>
            <Nav flag={true} />
           <div className="form-details   gap-10 mt-12  mx-auto w-11/12 flex flex-col justify-evenly items-center">
           <div className="border-2 rounded-md shadow-md w-1/4 min-h-40 text-sm px-1 box-border">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, </div>
           <div>{form.name}</div>
           <div>{form.description}</div>
           <div>{form.link}</div>
           <div className="flex w-3/4  justify-around">
            <Button name="delete" buttonName="w-1/4 bg-red-500 border-red-500 text-white" onClick={deleteHandle}></Button>
            <Button name="Modify"buttonName="w-1/4 bg-teal-500 border-teal-500 text-white" />
           </div>
           </div>
            </>
        )
    }
}
export default FormDetails;