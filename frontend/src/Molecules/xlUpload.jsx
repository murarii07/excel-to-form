import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Button from "../Atoms/Button.jsx";
import DragBox from "../Atoms/dragBox";
import { useState } from "react";
import { fetchData } from "../fetchData.js";
import SkeletonLoading from "../Atoms/SkeletionLoading.jsx";
function XlUpload() {
    const [file, setFile] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const dispatch = useDispatch();
    const fields=useSelector(s=>s.Field.value)
    const [er,setEr]=useState(false)
    const takingFile = (file) => {
        setFile(file)
    }
    const formHandle = async () => {
        setEr(false)
        if(!file){
            alert("please upload file")
            return
        }
        if(fields.length){

            dispatch(changeFieldValue([]))
        }
        setIsLoad(true)
        const files = new FormData();
        files.append("excelFile", file)
        const options = { method: "POST", credentials: 'include', body: files }
        const response = await fetchData("http://localhost:5000/form/generate", options);
        if (response.success) {
            setFile(null)
            //here  logic will be added for preview
            console.log(response.data)
            setTimeout(()=> dispatch(changeFieldValue(response.data)),1000)
            setTimeout(()=> setIsLoad(false),1000)


        }
        else {
         setIsLoad(false)
            setEr(true)
            setEr(true)
            console.log("OOPS!!! error occurs")
        }
    }
    return (
        <div className="drag-form  w-11/12 m-auto min-h-fit flex flex-col items-center justify-center gap-5">
            <>
                <DragBox takingFile={takingFile} />
                <Button
                    name={"Generate"}
                    buttonName={"text-purple-600 submit-button border-purple-600 w-1/4 md:min-w-12 hover:text-white hover:bg-purple-600 hover:font-bold "}
                    onClick={formHandle} />
                   
                   {
                   !er?
                   isLoad && <SkeletonLoading />:<div>error in upload try again later.....</div>} 

            </>
        </div>

    );
}
export default XlUpload;