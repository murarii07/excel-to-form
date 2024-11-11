import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Input from "../Atoms/Input"
import Select from "../Atoms/SelectField"
import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
const EditBox = (props) => {
    const { field } = props
    const fields = useSelector(state => state.Field.value)
    const [f, setF] = useState(field)
    const dispatch = useDispatch();
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    const handle = (e) => {
        console.log(e.target.id)
        if (field.Id=== e.target.id) {
            console.log(field.LabelName)
           
            setF((prevField) => ({
                ...prevField,
                Type: e.target.value // Update the type with the 
            }));
            // console.log(fieldlist.indexOf(field))
            const updatelist = fields.map((x) => {
                if (x.LabelName === e.target.id) {
                    return { ...x, Type: e.target.value }
                }
                return x;
            })
            console.log(fields)
            dispatch(changeFieldValue(updatelist))
        }
    }
    return (
        <>
            <div className="edit-box">
                <Input name={f.Name}
                    className=""
                    key={props.index}

                    labelName={f.LabelName}
                    type={f.Type}
                    element={
                        f.Type==="radio"?<Button name="+" />:""
                    }
                >
                  
                </Input>

                <Button
                    // data-field-id={f.Id}  this is used for event delegation using data-* attribute
                    buttonName={"delete-btn  text-white  font-bold bg-red-600 text-center p-0.5 border-2"}
                    name="X"
                    onClick={props.editHandle}

                />
                <Select
                    id={f.Name}
                    name={"edit-file-type"}
                    className={`${f.Name} bg-teal-100 cursor-pointer border-2  border-teal-100`}
                    onChange={handle}
                    inputTypes={inputTypes} />
            </div>


        </>
    )

}
export default EditBox;