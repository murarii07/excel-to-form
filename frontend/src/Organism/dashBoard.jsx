import Button from "../Atoms/Button";
import Nav from "../Molecules/Navbar";
import Input from "../Atoms/Input";
import { useEffect, useState } from "react";
const MyTask=()=>{
    const [formList,setFormList]=useState(["s1","s2","s221"]);
    const searching=(e)=>{
        console.log(e.target.value)
        if(e.target.value!=null){
            let arr=["s1","s2","s221"].filter(x=>x.includes(e.target.value));
            setFormList(arr);
        }
        
        
    }

    return(
        <>
        <Nav />
         <Button buttonName="filter"  name="filter" />
         <div className="search">
            <Input placeholder="enter form name or id"  onChange={searching} />
            <Button buttonName="search"  name="search" onClick={searching}  />
         </div>
        <div className="form-container">
            {formList.map((x,index)=>(
            <div className={x} key={index}>{x}</div>
            ))}
           
        </div>
        </>
    );
}
export default MyTask