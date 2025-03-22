
import Button from "../Atoms/Button"
import Select from "../Atoms/SelectField"
import InputField from "../Atoms/inputField";
import Label from "../Atoms/Label";
import { useDispatch, } from "react-redux";
import { addNewKey, changeSpecificFieldValue } from "../redux/formElement";
import useDebounce from "../CustomHooks/debounce";
import '../Working.css'
import { Dialog } from "@headlessui/react";
import { DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'

 function ValueList({ isOpen,  setIsOpen, values }) {
    const [valueArray, setValueArray] = useState(values);
    const [value, setValue] = useState(0)
    const dispatch = useDispatch()
    console.log(valueArray)
    const addValue = () => {
        if (!value)
            return
        setValueArray([...valueArray, value])
    }
    const deleteValue = (val) => {
        if (!val)
            return
        setValueArray(valueArray.filter(x => x !== val))
    }
    const close = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        console.log("Dialog state changed:", isOpen);
    }, [isOpen]);
    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            {/* Background overlay */}
            <div className="fixed inset-0  w-screen bg-black/50 backdrop-blur-sm " />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel
                    className="w-full max-w-md rounded-xl bg-neutral-800 p-6  shadow-xl transition-all duration-300 ease-out"
                >
                    <DialogTitle as="h3" className="text-lg font-semibold text-white">
                        Confirm Action
                    </DialogTitle>

                    <div className=" flex  items-center justify-around gap-2">
                        <InputField
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="text-white bg-white p-2 border-slate-100"
                        />
                        <button className="text-white bg-green-300 min-w-14" onClick={addValue}>add</button>
                    </div>
                    {/* Action Buttons */}
                    <div className="overflow-auto border-slate-200">
                        {values.map((x,index) => (
                            <>
                                <div className="border-2 m-0 flex  gap-10 items-center justify-between" key={index}>
                                    <span className="text-white">{x}</span>
                                    <button className="text-white bg-red-300" onClick={() => deleteValue(x)}>delete</button>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end gap-3">
                        <button
                            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-red-600 focus:ring-1 focus:ring-white"
                            onClick={close}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md bg-[#8A2BE2] px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-green-500 focus:ring-1 focus:ring-white"
                            onClick={() => {
                                close()
                            }}
                        >
                            OK
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
function EditBox(props) {
    const { field } = props
    const [regexTrue, setRegexTrue] = useState(false);
    const [f, setF] = useState(field)
    const [regex, setRegex] = useState(field.Regex || "")
    const [input, setInput] = useState(true)
    const dispatch = useDispatch();
    const [arr, setArr] = useState(field.Value || ["option1"])
    const [inputLabel, setInputLabel] = useState(true)
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    const [isOpen, setIsOpen] = useState(false)
    const regexHandle = useDebounce((e) => {
        if (e.target.value) {
            setRegex(e.target.value)

        }
    }, 500)
    useEffect(() => {
        if (regex) {
            dispatch(addNewKey([f.Name, { Regex: regex }]))
        }
    }, [regex])
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
        console.log(e.target.id, field)
        console.log("YEHH", e.target.id, field.Id, field.Id === e.target.id)
        if (field.Id === e.target.id) {
            changeFieldState({ Type: e.target.value })
            updateFieldList({ Type: e.target.value }, e.target.id)
        }
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
                    setRegexTrue(false)
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
                        <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={() => setInput(false)} />
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


                    {/* using default checked as f.Required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.Required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
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
                {input ? <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={() => setInput(false)} />
                    : <InputField name={f.Name}
                        id={f.Id}
                        type={"tex"}
                        onChange={handleLabelChange}
                        placeholder={f.LabelName}
                        className="changeAbleLabelName outline-none"

                    />}

                <Select
                    selcetName={f.Name}
                    // key={props.index}
                    inputTypes={f.Options}
                />
                <button className="bg-green-500 text-white w-[30%] p-2" onClick={() => setIsOpen(true)}>modify values</button>
                {/* <div className="absolute top-[10px] bg-red-300 z-10">write</div> */}
                {<ValueList values={f.Options} setIsOpen={setIsOpen()} isOpen={isOpen} />}
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


                    {/* using default checked as f.Required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.Required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
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
                {input ? <Label labelname={f.LabelName} htmlFor={f.Name} onDoubleClick={() => setInput(false)} />
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


                    {/* using default checked as f.Required  so if server give required is true then it indicate in togglr */}
                    <Label
                        labelname={
                            <>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                                <InputField type="checkbox" value="required" defaultChecked={f.Required || false} onClick={toggleRequiredField} className="sr-only peer pl-10" />
                                <div className="relative w-7 h-4   rounded-full peer bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
                            </>}
                        className=" inline-flex gap-3 items-center cursor-pointer justify-end"
                    />

                </div>
                {
                    !regexTrue ?
                        <button className="bg-blue-500 text-white max-w-32" onClick={() => setRegexTrue(true)}>Add Regex</button> :
                        <InputField name={"regex"}
                            key={`${props.index}00`}
                            type={"text"}
                            placeholder={regex || ""}
                            onChange={(e) => regexHandle(e)}
                            className={"changeAbleLabelName"}
                        />

                }
            </div>


        </>
    )

}
export default EditBox;