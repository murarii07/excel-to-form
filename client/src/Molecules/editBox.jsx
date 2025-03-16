import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Select from "../Atoms/SelectField"
import InputField from "../Atoms/inputField";
import Label from "../Atoms/Label";
import { useDispatch, useSelector } from "react-redux";
import { changeSpecificFieldValue } from "../redux/formElement";
import useDebounce from "../CustomHooks/debounce";
import '../Working.css'
function EditBox(props) {
    const { field } = props
    const [f, setF] = useState(field)
    const [input, setInput] = useState(true)
    const dispatch = useDispatch();
    const [arr, setArr] = useState(field.Value || ["option1"])
    const [inputLabel, setInputLabel] = useState(true)
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    const changeFieldState = (obj) => {
        setF((prevField) => ({
            ...prevField,
            ...obj // Update the type with the 
        }));
    }
    const updateFieldList = (obj, q2) => {
        dispatch(changeSpecificFieldValue([q2, obj]))
    }
    const handlTypeChange = (e) => {
        console.log(e.target.id)
        if (field.Id === e.target.id) {
            changeFieldState({ Type: e.target.value })
            updateFieldList({ Type: e.target.value }, e.target.id)
        }
    }
    const handleInput = () => {
        setInput(false)
    }
    const handleLabelChange = useDebounce((e) => {
        changeFieldState({ LabelName: e.target.value })
        updateFieldList({ LabelName: e.target.value }, e.target.id)
    }, 1000)



    const updateOptionValue = useDebounce((e) => {
        const d = e.target.getAttribute("data-field-id")
        if (d) {
            const up = arr.map((x) => {
                if (x === d) {
                    return e.target.value;
                }
                return x;
            })
            setArr(up)
        }

    }, 1000)
    const toggleRequiredField = useDebounce((e) => {
        let r = f.required
        changeFieldState({ required: !r });
        updateFieldList({ required: !r }, f.Id)

    }, 500)
    useEffect(() => {
        if ((f.Type === "radio" || f.Type === "checkbox")) {
            changeFieldState({ Value: arr });
            updateFieldList({ Value: arr }, f.Id)
        }
    }, [arr])

    useEffect(() => {
        const handleClickOutsidee = (e) => {
            if (e.target.classList.contains("changeAbleLabelName")) {
                // console.log(e.target.classList.contains("changeAbleLabelName"))
                if (e.key === "Enter") {
                    setInput(true)
                    setInputLabel(true)
                }
            }
        };
        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);
        return () => {
            document.querySelector("body").removeEventListener("keypress", handleClickOutsidee);
        };
    }, [input]);
    if ((f.Type === "radio" || f.Type === "checkbox")) {
        return (

            <div className="edit-box flex gap-2 relative">
                {
                    input ?
                        <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={handleInput} />
                        :
                        <InputField name={f.Name}
                            className="changeAbleLabelName  outline-none"
                            id={f.Id}
                            type={"text"}
                            onChange={handleLabelChange}
                            placeholder={f.Placeholder || ""}

                        />
                }
                {arr.map((x, index) => (
                    <div
                        className="w-11/12 flex bottom-2 items-center justify-around "
                        key={index}>
                        <Button
                            name="close"
                            buttonName=" w-1/12  material-symbols-outlined hover:bg-red-600 hover:text-white"

                            onClick={() => {
                                setArr(arr.filter(y => y !== x))
                            }} />
                        <InputField
                            data-field-id={f.Id}
                            type={f.Type}
                            name={f.Type}
                            value={x}
                            className={`changeAbleLabelName outline-none  px-1 text-right w-1/6`}

                        />
                        {!(inputLabel) ? <InputField
                            className="changeAbleLabelName  cursor-pointer  outline-none"
                            onChange={updateOptionValue}
                            data-field-id={x}
                            type={"text"}
                            placeholder={x}


                        /> : <Label
                            htmlFor={f.Name}
                            className="text-black"
                            labelname={x}
                            onDoubleClick={() => {
                                setInputLabel(false)
                            }} />}

                    </div>
                ))}
                <Button name="add_box" className="material-symbols-outlined  bg-green-500 text-white border-none w-fit p-1" onClick={
                    (e) => {
                        console.log("As", f)
                        let r = arr.length + 1;
                        setArr([...arr, `options${r}`]);
                        console.log("sdsd", arr)
                        e.stopPropagation()
                    }}
                />
                <Button
                    // data-field-id={f.Id}  this is used for event delegation using data-* attribute
                    buttonName={"absolute material-symbols-outlined w-7 max-h-4 text-white   top-1 right-2 bg-red-500 "}
                    name="delete_forever"
                    onClick={props.editHandle}

                />

                <div className="flex justify-between">
                    <Select
                        id={f.Name}
                        name={"edit-file-type"}
                        className={`${f.Name} bg-teal-100 cursor-pointer border-2  border-teal-100`}
                        onChange={handlTypeChange}
                        inputTypes={inputTypes} />


                    {/* using default checked as f.required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer dark:bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
                            </>}
                        className=" inline-flex gap-3 items-center cursor-pointer justify-end"
                    />






                </div>
            </div>


        )
    }
    else if (f.Type === "select") {
        return (
            <div className="edit-box flex gap-2">
                {input ? <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={handleInput} />
                    : <InputField name={f.Name}
                        id={f.Id}
                        type={"tex"}
                        onChange={handleLabelChange}
                        placeholder={f.LabelName}
                        className="changeAbleLabelName outline-none"

                    />}
                {/* <InputField name={f.Name}
                    key={props.index}
                    type={f.Type}

                /> */}
                <Select
                    selcetName={f.Name}
                    // key={props.index}
                    inputTypes={f.Options}

                />
                <Button
                    // data-field-id={f.Id}  this is used for event delegation using data-* attribute
                    buttonName={"absolute material-symbols-outlined w-7 max-h-4 text-white   top-1 right-2 bg-red-500 "}
                    name="delete_forever"
                    onClick={props.editHandle}

                />


                <div className="flex justify-between">
                    <Select
                        id={f.Name}
                        name={"edit-file-type"}
                        className={`${f.Name} bg-teal-100 cursor-pointer border-2  border-teal-100`}
                        onChange={handlTypeChange}
                        inputTypes={inputTypes} />


                    {/* using default checked as f.required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer dark:bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
                            </>}
                        className=" inline-flex gap-3 items-center cursor-pointer justify-end"
                    />
                </div>
            </div>

        )
    }
    return (
        <>
            <div className="edit-box flex gap-2 relative">
                {input ? <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={handleInput} />
                    : <InputField name={f.Name}
                        id={f.Id}
                        type={"text"}
                        onChange={handleLabelChange}
                        placeholder={f.LabelName}
                        className="changeAbleLabelName outline-none"

                    />}
                <InputField name={f.Name}
                    key={props.index}
                    type={f.Type}
                    placeholder={f.Placeholder || ""}

                />

                <Button
                    // data-field-id={f.Id}  this is used for event delegation using data-* attribute
                    buttonName={" material-symbols-outlined w-7 max-h-4 text-white   top-1 right-2 bg-red-500 absolute"}
                    name="delete_forever"
                    onClick={props.editHandle}

                />



                <div className="flex justify-between">
                    <Select
                        id={f.Name}
                        name={"edit-file-type"}
                        className={`${f.Name} bg-teal-100 cursor-pointer border-2  border-teal-100`}
                        onChange={handlTypeChange}
                        inputTypes={inputTypes} />


                    {/* using default checked as f.required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer dark:bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
                            </>}
                        className=" inline-flex gap-3 items-center cursor-pointer justify-end"
                    />

                </div>
            </div>


        </>
    )

}
export default EditBox;