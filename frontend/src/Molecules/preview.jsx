import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { changeFieldValue } from "../redux/formElement";
import EditBox from "./editBox";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
function Preview() {
    const navigate = useNavigate();
    const fields = useSelector((state) => state.Field.value);
    console.log(fields)
    const dispatch = useDispatch()
    const editHandle = (fieldId) => {
        const updatedFields = fields.filter((field) => field.Id !== fieldId);
        console.log("Filtered fields:", updatedFields);
        dispatch(changeFieldValue(updatedFields));
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

            const blob = await response.blob();
            console.log(blob)
            const url = URL.createObjectURL(blob);
            console.log(url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'form.html'); // Replace with your desired file name
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url); // Cleanup
        } catch (error) {
            console.error('Download failed:', error);
        }
    }
    const handleds = () => {
        try {
            navigate("/formId")
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            {fields.length ? (
                <>
                    <div className="preview-form rounded-lg bg-purple-200 border-2 border-purple-200">
                        {fields.map((x, index) =>
                            <EditBox key={x.Id} index={index} field={x} editHandle={() => editHandle(x.Id)} />
                        )}
                    </div>
                    <div className="preview-btn">
                        <Button
                            buttonName="download-btn border-green-500  text-green-500 hover:bg-green-500 px-3 hover:text-white "
                            name={"download"} onClick={handled}></Button>
                        <Button
                            name="livePreview" onClick={handleds}
                            buttonName={"save-btn border-green-500  text-green-500 hover:bg-green-500 px-3 hover:text-white "} />
                    </div>
                </>
            )
                : ""}

        </>
    )
}
export default Preview;