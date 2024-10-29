
function Button(props) {
    // Destructuring the props
    const { buttonType, buttonName, name, ...rest } = props;

    return (
        <button
            type={buttonType}
            className={`${buttonName}`}
            {...rest}
        >
            {name}
        </button>
    );
}
export default Button;