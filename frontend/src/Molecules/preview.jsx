import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { removeSpecificField } from "../redux/formElement";
import EditBox from "./editBox";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import {ReactComponent as DownloadIcon} from '../svgs/download.svg'
function Preview() {
    const navigate = useNavigate();
    const fields = useSelector((state) => state.Field.value);
    console.log(fields)
    const dispatch = useDispatch()
    const editHandle = (fieldId) => {
        // const updatedFields = fields.filter((field) => field.Id !== fieldId);
        // console.log("Filtered fields:", updatedFields);
        // // dispatch(changeFieldValue(updatedFields));
        dispatch(removeSpecificField(fieldId))
    };
    useEffect(() => {
        console.log(fields)
    }, [fields])
    const handled = async () => {
        try {
            const response = await fetch('http://localhost:5000/form/download', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //saving the file in users machine
            response.blob()
            .then((blob)=>{
                saveAs(blob,"form.html");
            });

        } catch (error) {
            console.error(error.message);
        }
    }
    const handleds = () => {
        try {
            navigate("/preview")
        } catch (e) {
            console.log(e)
        }
    }

    //event delegation approach
    // const editHandleF = (e) => {
    //     let r=e.target.classList
    //     console.log(r.contains("delete-btn"))
    //     if(r.contains("delete-btn")){
    //         let fieldId=e.target.getAttribute("data-field-id")
    //         const updatedFields = fields.filter((field) => field.Id !== fieldId);
    //         console.log("Filtered fields:", updatedFields);
    //         dispatch(changeFieldValue(updatedFields));
    //     }
    // };
    return (
        <>
            {fields.length ? (
                <>
                    <div className="preview-form rounded-lg bg-purple-200 border-2 border-purple-200 "
                    //  onClick={editHandleF}
                     >
                        {fields.map((x, index) =>
                            <EditBox key={x.Id} index={index} field={x}
                            editHandle={() => editHandle(x.Id)}  />
                        )}
                    </div>
                    <div className="preview-btn">
                        <Button
                            buttonName="download-btn border-teal-700  text-teal-700 hover:bg-teal-700 hover:text-white "
                            name={<DownloadIcon />} onClick={handled}>
                                
                            </Button>
                        <Button
                            name="livePreview" onClick={handleds}
                            buttonName={"save-btn border-teal-700  text-teal-700 hover:bg-teal-700 px-3 hover:text-white "} />
                    </div>
                </>
            )
                : ""}

        </>
    )
}
export default Preview;