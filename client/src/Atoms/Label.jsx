function Label(props) {
    const { ...rest } = props
    return (
        <label htmlFor={props.htmlFor} {...rest}>{props.labelname} {props.required && <span className="text-red-500">*</span>}</label>
    )
}
export default Label;