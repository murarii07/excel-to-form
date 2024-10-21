import { useDispatch, useSelector } from "react-redux";
import Button from "../Atoms/Button";
import { changeFieldValue } from "../redux/formElement";
import EditBox from "./editBox";
import { useEffect, useState } from "react"
function Preview() {
    const fields = useSelector((state) => state.Field.value);
    console.log(fields)
    const dispatch = useDispatch()
    const editHandle = (fieldId) => {
        const updatedFields = fields.filter((field) => field.Id !== fieldId);
        console.log("Filtered fields:", updatedFields);
        dispatch(changeFieldValue(updatedFields));
    };
    useEffect(()=>{
        console.log(fields)
    })
    return (
        <>
            {fields.length ? (
                <>
                    <div className="preview-form">
                        {fields.map((x, index) =>
                            <EditBox key={index} index={index} field={x} onClick={() => editHandle(x.Id)} />
                        )}
                    </div>
                    <div className="preview-btn">
                        <Button
                            buttonName="download-btn"
                            name={<a href="http://localhost:5000/form/download/12345">download</a>} />
                        <Button
                            name={<a href="http://localhost:3000/formId">save</a>}
                            buttonName={"save-btn"} />
                    </div>
                </>
            )
                : ""}

        </>
    )
}
export default Preview;