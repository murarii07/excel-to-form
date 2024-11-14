import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Select from "../Atoms/SelectField"
import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Radio from "../Atoms/RadioButton";
import InputField from "../Atoms/inputField";
import Label from "../Atoms/Label";
const EditBox = (props) => {
    const { field } = props
    const fields = useSelector(state => state.Field.value)
    const [f, setF] = useState(field)
    const [input, setInput] = useState(true)
    const dispatch = useDispatch();
    const [arr, setArr] = useState([f])
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    const debounce = (func, timer) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => func(...args), timer)
        }
    }
    function changeFFlag(obj) {
        setF((prevField) => ({
            ...prevField,
            ...obj // Update the type with the 
        }));
    }
    function updateFieldList(obj , q2) {
        const updatelist = fields.map((x) => {
            if (x.Id===q2) {
                return { ...x, ...obj }
            }
            return x;
        })
        console.log(fields)
        dispatch(changeFieldValue(updatelist))
    }
    const handle = (e) => {
        console.log(e.target.id)
        if (field.Id === e.target.id) {
            changeFFlag({ Type: e.target.value })
            updateFieldList({Type: e.target.value},e.target.id)

             
        }
}
    const handleInput = () => {
        setInput(false)
    }
    const handleChange = debounce((e) => {
        changeFFlag({ LabelName: e.target.value })
        updateFieldList({ LabelName: e.target.value }, e.target.id)
    }, 1000)

    useEffect(() => {
        if ((f.Type === "radio") || (f.Type === "checkbox")) {
            // const d=prompt("enter options name")
            setArr([{ ...f, Value: "options" }])
            const updatelist = fields.map((x) => {
                if ((x.Type === "radio") || (x.Type === "checkbox")) {
                    return { ...x, Value: "options" }
                }
                return x;
            })
            console.log(fields)
            dispatch(changeFieldValue(updatelist))
        }
    }, [f])

    useEffect(() => {
        const handleClickOutsidee = (e) => {
            if (e.target.classList.contains("changeAbleLabelName")) {
                // console.log(e.target.classList.contains("changeAbleLabelName"))

                if (e.key === "Enter") {
                    setInput(true)
                }
            }

        };

        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("key", handleClickOutsidee);
        };
    }, [input]);
    return (
        <>
            <div className="edit-box flex gap-2">
                {(f.Type === "radio" || f.Type === "checkbox") ?
                    (<>
                        {
                            input ?
                                <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={handleInput} />
                                : <InputField name={f.Name}
                                    className="changeAbleLabelName  outline-none"
                                    id={f.Id}
                                    type={"text"}
                                    onChange={handleChange}

                                />
                        }
                        {arr.map((x, index) => (
                            <div className="w-11/12 flex bottom-2 items-center justify-around " key={index}>

                                <InputField
                                    data={f.Id}
                                    type={x.Type}
                                    name={x.Name}
                                    value={x.Value}
                                    className={`${"changeAbleLabelName outline-none"} px-1 outline-none`} />
                                <Label
                                    htmlFor={x.Name}
                                    className="text-black"
                                    labelname={x.Value} />


                            </div>
                        ))}

                        {/* <Radio radioInputs={arr} labelName={f.LabelName} /> */}

                        <Button name="+" className="bg-green-500 text-white border-none w-1/6" onClick={
                            (e) => {
                                console.log("As", f)
                                const d = prompt("emter value ");
                                setArr([...arr, { ...f, Value: d, LabelName: d }]);
                                console.log(arr)
                                e.stopPropagation()
                            }}
                        />
                    </>

                    ) : (
                        <>
                            {input ? <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={handleInput} />
                                : <InputField name={f.Name}
                                    id={f.Id}
                                    type={"text"}
                                    onChange={handleChange}
                                    placeholder={f.LabelName}
                                    className="changeAbleLabelName outline-none"

                                />}
                            <InputField name={f.Name}
                                key={props.index}
                                type={f.Type}
                            />
                        </>

                    )
                }



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