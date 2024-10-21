import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Input from "../Atoms/Input"
import Select from "../Atoms/SelectField"
import { useDispatch, useSelector } from "react-redux";
const EditBox = (props) => {
    const { field } = props
    const [f, setF] = useState(field)
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "submit", "file", "date"
    ]
    const handle = (e) => {
        
        if (field.labelName === e.target.className) {
            setF((prevField) => ({
                ...prevField,
                Type: e.target.value // Update the type with the 
            }));      
        }
    }
    return (
        <>
            <div className="edit-box">
                <Input name={field.Name}
                    key={props.index}
                    id={field.Id}
                    labelName={field.labelName}
                    type={field.Type}
                />
                <Button
                    buttonName={"delete-btn"}
                    name="X"
                    onClick={props.onClick}

                />
                <Select
                    id={"edit-file-type"}
                    name={"edit-file-type"}
                    className={field.Name}
                    handle={e => handle(e)}
                    inputTypes={inputTypes} />
            </div>


        </>
    )
}
export default EditBox