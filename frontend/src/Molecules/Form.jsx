import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
function Form(props) {
    const { field } = props
    const formHandle = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={props.formHandle ?? formHandle} encType="multipart/form-data" method="post" className="w-full ">
                {field.map(
                    (x, index) =>
                        <div className="input-preview input-div  mt-3 flex flex-col">

                            <Input
                                className={" border-2 border-black"}
                                name={x.Name}
                                key={x.Id}
                                id={x.Id}
                                labelName={x.LabelName}
                                type={x.Type} element={ <div className="error">sdsd</div>} />
                           

                        </div>
                )}
                <Button
                    buttonName="submit-button border-purple-600 w-1/4 md:min-w-12 hover:text-white hover:bg-purple-600 hover:font-bold 
                    text-purple-600"
                    name={props.buttonName}
                    buttonType='submit' />
            </form>
        </>
    );
}
export default Form;