import { useDispatch } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Button from "../Atoms/Button.jsx";
import DragBox from "../Atoms/dragBox";
import { useState } from "react";
import { fetchData } from "../fetchData.js";
function XlUpload() {
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();


    const takingFile = (file) => {
        setFile(file)
    }
    const formHandle = async () => {
        const files = new FormData();
        files.append("excelFile", file)
        const options = { method: "POST", credentials: 'include', body: files }
        const response = await fetchData("http://localhost:5000/form/generate", options);
        if (response.success) {
            setFile(null)
            //here  logic will be added for preview
            console.log(response.data)
            dispatch(changeFieldValue(response.data))

        }
        else {
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

            </>
        </div>

    );
}
export default XlUpload;