const Select = (props) => {
    const { inputTypes, selcetName, className, id, onChange } = props
    return (
        <select
            name={selcetName}
            className={`${className} rounded-md  p-2 border-2 border-slate-50 `}
            id={id}
            onChange={onChange}>
            {
                inputTypes.map((x, index) => <option

                    value={x} key={index}>{x}</option>)}
        </select>
    )
}
export default Select;