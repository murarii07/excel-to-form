function InputField(props) {
    const { ...rest } = props
    return (
        <input name={props.name} className={`${props.className} px-1 outline-none`} data-field-id={props.data} {...rest} />
    )
}
export default InputField;