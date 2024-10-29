
// outline-none  is usedwhen input is foucus and we not want to make border to display
function Input(props) {
    const {name, labelName,className,...rest}=props
    return (
       <>
            <label htmlFor={name} className="text-black"  >{labelName}</label>
            <input name={name} className={`${className} px-1 outline-none`} {...rest} />
            {props.element}
       </>
         
        
)
}
export default Input;