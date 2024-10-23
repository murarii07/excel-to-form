import Button from "../Atoms/Button";
import Nav from "../Molecules/Navbar";
import Input from "../Atoms/Input";
import { useEffect, useState } from "react";
const MyTask = () => {
    const [formList, setFormList] = useState(["formId1", "formId2", "formId3"]);
    const searching = (e) => {
        console.log(e.target.value)
        if (e.target.value != null) {
            let arr = ["formId1", "formId2", "formId3"].filter(x => x.includes(e.target.value));
            setFormList(arr);
        }


    }

    return (
        <>
            <Nav />
            {/* <Button buttonName="filter"  name="filter" /> */}
            <div className="search mx-auto w-11/12 h-14 box-border flex items-center gap-3.5 ">
                <Input
                    className="box-border border-2 rounded-xl h-full px-3 w-7/12 border-black "
                    placeholder="enter form name or id" onChange={searching} />
                <Button buttonName="search font-bold rounded-xl px-3 h-11/12 border-green-500  text-green-500 hover:bg-green-500 hover:text-white " name="search" onClick={searching} />
            </div>
            <div className="form-container  mx-auto my-4 box-border w-11/12 px-5 py-5 flex gap-10 flex-wrap">
                <div className="box-border min-w-20 min-h-24 flex flex-col gap-y-3 items-center  ">
                    <div className="img border-black border-2 w-full py-3 min-h-16 text-center box-border text-3xl text-amber-800 rounded-md">+</div>
                    <div className="caption"><a href="http://localhost:3000/">New form</a></div> </div>
                {formList.map((x, index) => (
                    <div className="box-border min-w-20 min-h-24 flex flex-col gap-y-3 items-center " key={index}>
                        <div className="img border-black border-2 w-full min-h-16 text-center box-border rounded-md">image</div>
                        <div className="caption">{x}</div> </div>
                ))}

            </div>
        </>
    );
}
export default MyTask