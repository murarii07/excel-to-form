import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
function Form(props) {
    const { field,formHandles } = props
    console.log(field)
    const formHandle = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={(e)=>formHandles(e)} encType="multipart/form-data" className={`w-full  ${props.formClass}`}>
                {field.map(
                    (x, index) =>
                        <div key={x.Id} className="input-preview  flex flex-col bg-purple-100 border-2 border-purple-100 rounded-xl px-2 shadow-md ">
                            <Input
                                className={" border-2 border-black bg-purple-100"}
                                name={x.Name}
                                key={index}
                                id={x.Id}
                                labelName={x.LabelName}
                                type={x.Type}
                                element={
                                    x.isElement && <div className="error">This indicates error</div>} />
                        </div>
                )}
                <Button
                    buttonName="text-purple-600 submit-button border-purple-600 w-1/4 md:min-w-12 hover:text-white hover:bg-purple-600 hover:font-bold hover:shadow-purple-400
                    "
                    name={props.buttonName}
                    />
            </form>
        </>
    );
}
export default Form;