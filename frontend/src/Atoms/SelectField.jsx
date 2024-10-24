const Select = (props) => {
    const {inputTypes,selcetName,className,id,onChange}=props
    return (
        <select 
        name={selcetName} 
        className={`${className} rounded-md border-2 border-black p-2 bg-white `}
        id={id} 
        onChange={onChange}>
            {
            inputTypes.map((x, index) => <option
                value={x} key={index}>{x}</option>)}
        </select>
    )
}
export default Select;