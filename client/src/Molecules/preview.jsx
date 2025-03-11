import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { removeSpecificField } from "../redux/formElement";
import EditBox from "./editBox";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import DownloadIcon from '../svgs/download.svg?react'
import useFetchData from "../CustomHooks/useFetchData";
function Preview() {
    const navigate = useNavigate();
    const fields = useSelector((state) => state.Field.value);
    console.log(fields)
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/form/download`)
    const dispatch = useDispatch()
    const editHandle = (fieldId) => {
        dispatch(removeSpecificField(fieldId))
    };

    const handled = async () => {
        setOptions({ method: 'GET', credentials: 'include', })
    }
    const handleds = () => {
        try {
            navigate("/preview")
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(fields)
    }, [fields])
    useEffect(() => {
        if (response && !error) {
            response.blob()
                .then((blob) => {
                    saveAs(blob, "form.html");
                });
        }
        else if (error) {
            alert("something went wrong")
            console.log(error)
            // navigate("/error")
        }
    }, [response, error])
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
                                editHandle={() => editHandle(x.Id)} />
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