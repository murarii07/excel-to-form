import { useDispatch } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Form from "./Form";
function XlUpload() {

    const dispatch = useDispatch();
    
    const fetchData = async (file, url) => {
        try {
            let response = await fetch(url, { method: "POST", credentials:'include', body: file })
            let resJson = await response.json();
            return resJson;
        }
        catch (error) {
            return false;
        }
    }
    
    const formHandle = async (e) => {
        e.preventDefault();
        console.log(e)

        const file = new FormData(e.target);
        const response = await fetchData(file, "http://localhost:5000/form/generate");
        if (response.success) {
            e.target.reset();
            //here  logic will be added for preview
            console.log(response.data)
            dispatch(changeFieldValue(response.data))

        }
        else {
            console.log("OOPS!!! error occurs")
        }
    }
    return (
        <div className="drag-form border-2 border-black rounded-md w-11/12 m-auto min-h-fit">

        <Form 
        Name="upload-form"
        formHandle={formHandle} field={[{     
            Type:"file",
            Name:"excelFile",
            labelName:"upload a file:",
            Id:"excelFile"
        }]} />
        </div>
       
    );
}
export default XlUpload;