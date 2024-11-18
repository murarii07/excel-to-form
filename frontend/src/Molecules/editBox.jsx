import { useEffect, useState } from "react"
import Button from "../Atoms/Button"
import Select from "../Atoms/SelectField"
import InputField from "../Atoms/inputField";
import Label from "../Atoms/Label";
import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import useDebounce from "../CustomHooks/debounce";
function EditBox(props) {
    const { field } = props
    const fields = useSelector(state => state.Field.value)
    const [f, setF] = useState(field)
    const [input, setInput] = useState(true)
    const dispatch = useDispatch();
    const [arr, setArr] = useState([{ optionLabel: "option1", value: "option1" }])
    const [inputLabel, setInputLabel] = useState(true)
    const inputTypes = [
        "text", "password", "email", "url", "number", "checkbox",
        "radio", "file", "date"
    ]
    function changeFFlag(obj) {
        setF((prevField) => ({
            ...prevField,
            ...obj // Update the type with the 
        }));
    }
    function updateFieldList(obj, q2) {
        const updatelist = fields.map((x) => {
            if (x.Id === q2) {
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
            updateFieldList({ Type: e.target.value }, e.target.id)
        }
    }
    const handleInput = () => {
        setInput(false)
    }
    const handleChange = useDebounce((e) => {
        changeFFlag({ LabelName: e.target.value })
        updateFieldList({ LabelName: e.target.value }, e.target.id)
    }, 1000)

    useEffect(() => {
        if ((f.Type === "radio") || (f.Type === "checkbox")) {
            const updatelist = fields.map((x) => {
                if ((x.Type === "radio") || (x.Type === "checkbox")) {
                    return { ...x, Value: arr }
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
                    setInputLabel(true)
                }
            }

        };

        document.querySelector("body").addEventListener("keypress", handleClickOutsidee);

        return () => {
            document.querySelector("body").removeEventListener("key", handleClickOutsidee);
        };
    }, [input]);
    const handleChangeOption = useDebounce((e) => {
        const d = e.target.getAttribute("data-field-id")
        if (d) {
            const up = arr.map((x) => {
                if (x.optionLabel === d) {
                    return { ...x, optionLabel: e.target.value, value: e.target.value };
                }
                return x;
            })
            setArr(up)
        }

    }, 1000)
    const requireHandle=useDebounce((e)=>{
        console.log(e.target.checked)
        changeFFlag({required: true});
        updateFieldList({required: true},f.Id)

    },1000)
    useEffect(() => {
        changeFFlag({Value: arr });
    }, [arr])
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
                            <div className="w-11/12 flex bottom-2 items-center justify-around  " key={index}>

                                <InputField
                                    data-field-id={f.Id}
                                    type={f.Type}
                                    name={f.Type}
                                    value={x.value}


                                    className={`${"changeAbleLabelName outline-none"} px-1 text-right`} />
                                {!(inputLabel) ? <InputField
                                    className="changeAbleLabelName  cursor-pointer  outline-none"
                                    onChange={handleChangeOption}
                                    data-field-id={x.optionLabel}
                                    type={"text"}
                                    placeholder={x.value}


                                /> : <Label
                                    htmlFor={f.Name}
                                    className="text-black"
                                    labelname={x.value}
                                    onDoubleClick={() => {
                                        setInputLabel(false)
                                    }} />}


                            </div>
                        ))}
                        <Button name="+" className="bg-green-500 text-white border-none w-1/6" onClick={
                            (e) => {
                                console.log("As", f)
                                let r = arr.length + 1;
                                setArr([...arr, { optionLabel: `options${r}`, value: `options${r}` }]);
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

                <div className="flex justify-between">
                    <Select
                        id={f.Name}
                        name={"edit-file-type"}
                        className={`${f.Name} bg-teal-100 cursor-pointer border-2  border-teal-100`}
                        onChange={handle}
                        inputTypes={inputTypes} />



                    <label className=" inline-flex gap-3 items-center cursor-pointer justify-end">
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">Required</span>
                        <input type="checkbox" value="required" onClick={requireHandle} className="sr-only peer pl-10" />
                        <div className="relative w-6 h-1   rounded-full peer dark:bg-purple-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-6px] after:start-[1px] after:bg-purple-900 after:border-purple-900 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-purple-900 peer-checked:bg-purple-900"></div>
                        
                    </label>


                </div>
            </div>


        </>
    )

}
export default EditBox;