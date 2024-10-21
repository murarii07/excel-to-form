function Input(props) {
    const {name, labelName,...rest}=props
    return (
       <>
            <label htmlFor={name}  >{labelName}</label>
            <input name={name} {...rest} />
       </>
         
        
)
}
export default Input;