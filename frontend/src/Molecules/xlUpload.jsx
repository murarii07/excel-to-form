import { useDispatch } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Form from "./Form";
function XlUpload() {

    const dispatch = useDispatch();
    
    const fetchData = async (file, url) => {
        try {
            let response = await fetch(url, { method: "POST", body: file })
            let resJson = await response.json();
            return resJson;
        }
        catch (error) {
            return false;
        }
    }
    
    const formHandle = async (e) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const file = new FormData(form);
        const response = await fetchData(file, "http://localhost:5000/form/generate");
        if (response.success) {
            form.reset();
            //here  logic will be added for preview
            console.log(response.data)
            dispatch(changeFieldValue(response.data))

        }
        else {
            console.log("OOPS!!! error occurs")
        }
    }
    return (
        <Form 
        Name="upload-form"
        formHandle={formHandle} field={[{     
            Type:"file",
            Name:"excelFile",
            labelName:"upload a file:",
            Id:"excelFile"
        }]} />
       
    );
}
export default XlUpload;