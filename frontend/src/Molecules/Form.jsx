import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
function Form(props) {
    const { field,formHandles } = props
    const formHandle = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={(e)=>formHandles(e)} encType="multipart/form-data" className="w-full">
                {field.map(
                    (x, index) =>
                        <div className="input-preview  flex flex-col bg-purple-200 rounded-xl px-2">
                            <Input
                                className={" border-2 border-black bg-purple-200"}
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
                    buttonName="text-purple-600 submit-button border-purple-600 w-1/4 md:min-w-12 hover:text-white hover:bg-purple-600 hover:font-bold 
                    "
                    name={props.buttonName}
                    buttonType='submit' />
            </form>
        </>
    );
}
export default Form;