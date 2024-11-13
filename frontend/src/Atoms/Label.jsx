function Label(props) {
    const {...rest}=props
    return (
        <label htmlFor={props.htmlFor} {...rest}>{props.labelname}</label>
    )
}
export default Label;