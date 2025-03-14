import InputField from "./inputField";
import Label from "./Label";

// outline-none  is usedwhen input is foucus and we not want to make border to display
function Radio(props) {
    const { className } = props
    return (
        <>
            {props.radioInputs.map((x, index) => (
                <div className="w-11/12 flex bottom-2 items-center justify-around " key={index}>
                    <InputField type={props.type} name={props.name} value={x} className={`${className} px-1 outline-none`} />
                    <Label htmlFor={props.name} className="text-black" labelname={x} />

                </div>
            ))}
        </>


    )
}
export default Radio;