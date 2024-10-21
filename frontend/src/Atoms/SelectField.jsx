const Select = (props) => {
    return (
        <select name={props.selcetName} className={props.className} id={props.id} onChange={props.handle}>
            {props.inputTypes.map((x, index) => <option
                value={x} key={index}>{x}</option>)}
        </select>
    )
}
export default Select;