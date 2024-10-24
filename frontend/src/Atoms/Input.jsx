function Input(props) {
    const {name, labelName,className,...rest}=props
    return (
       <>
            <label htmlFor={name}  >{labelName}</label>
            <input name={name} className={`${className}`} {...rest} />
       </>
         
        
)
}
export default Input;