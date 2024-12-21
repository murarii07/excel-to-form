import Button from "../Atoms/Button";
import Radio from "../Atoms/RadioButton";
import Label from "../Atoms/Label";
import InputField from "../Atoms/inputField";
function Form(props) {
    const { field, formHandles } = props
    console.log(field)
    return (
        <>
            <form onSubmit={formHandles} encType="multipart/form-data" className={`w-full  ${props.formClass}`}>
                {field.map(
                    (x, index) => (
                        <div key={x.Id} className="input-preview  flex flex-col bg-purple-100   rounded-xl px-2 shadow-md   border-white  " style={{ borderWidth: "10px" }}>
                            <Label labelname={x.LabelName} htmlFor={x.Name} required={x.required || false} />
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
                                        className={" border-2 border-black bg-purple-100"} />
                                )}

                        </div>

                    )
                )}
                <Button
                    buttonName="text-purple-600 submit-button border-purple-600 w-1/4 md:min-w-12 hover:text-white hover:bg-purple-600 hover:font-bold hover:shadow-purple-400
                    "
                    buttonType={props.buttonType}
                    name={props.buttonName}
                />
            </form>
        </>
    );
}
export default Form;