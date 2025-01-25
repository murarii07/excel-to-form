import Button from "../Atoms/Button";
import Radio from "../Atoms/RadioButton";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
function Form(props) {
    const { field, formHandles } = props
    console.log("Fields",field)
    return (
        <>
            <form onSubmit={formHandles} encType="multipart/form-data" className={`w-full  ${props.formClass}  `} >
                {field.map(
                    (x, index) => (
                        <div key={x.Id} className=" flex flex-col  px-2 shadow-md   border-white  bg-purple-50 rounded-3xl p-6 hover:shadow-xl transform transition-transform hover:-translate-y-1 z-10 " style={{ borderWidth: "10px" }}>
                            <Label labelname={x.LabelName} htmlFor={x.Name} required={x.required || false} className={"block text-sm font-medium text-neutral-950 mb-2"} />
                            {(x.Type === 'radio' || x.Type === 'checkbox') ? (
                                <Radio
                                    radioInputs={x.Value}
                                    type={x.Type}
                                    name={x.Name} />
                            )
                                :
                                (
                                    <InputField
                                        type={x.Type}
                                        required={x.required}
                                        name={x.Name}
                                        key={index}
                                        id={x.Id}
                                        className="w-full border border-purple-500 rounded-full h-[48px] px-4 focus:outline-none focus:ring focus:ring-purple-400 transition"/>
                                )}

                        </div>

                    )
                )}
                <Button
                    className="bg-purple-500 text-purple-50 font-medium rounded-2xl h-[48px] px-6 hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-400 transition z-20 md:w-1/4"
                    buttonType={props.buttonType}
                    name={props.buttonName}
                />
            </form>
        </>
    );
}
export default Form;