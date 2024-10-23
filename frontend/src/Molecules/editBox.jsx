import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Input from "../Atoms/Input"
import Select from "../Atoms/SelectField"
import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
const EditBox = (props) => {
    const dispatch = useDispatch();
    const fields = useSelector(state => state.Field.value)
    const [fieldlist, setFieldlist] = useState(fields)
    const { field } = props
    const [f, setF] = useState(field)
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    const handle = (e) => {

        if (field.labelName === e.target.className) {
            const change = []
            console.log(field.labelName)
            setF((prevField) => ({
                ...prevField,
                Type: e.target.value // Update the type with the 
            }));
            // for (const element of fieldlist) {
            //     if (element.Id === f.Id) {
            //         console.log(element.Id)
            //         setFieldlist((element=>(...element,)))
            //         element.Type = e.target.value

            //     }
            //     change.push(element)
            // }
            // dispatch(changeFieldValue(change));
            // console.log(fields)
            }}
        return (
            <>
                <div className="edit-box">
                    <Input name={f.Name}
                        key={props.index}
                        id={f.Id}
                        labelName={f.labelName}
                        type={f.Type}
                    />
                    <Button
                        buttonName={"delete-btn text-white font-bold bg-red-600 text-center p-0.5"}
                        name="X"
                        onClick={props.onClick}

                    />
                    <Select
                        id={"edit-file-type"}
                        name={"edit-file-type"}
                        className={f.Name}
                        onChange={e => handle(e)}
                        inputTypes={inputTypes} />
                </div>


            </>
        )
    
}
export default EditBox;