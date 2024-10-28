import Input from "../Atoms/Input";
import Button from "../Atoms/Button";
function Form(props) {
    const {field}=props
    const formHandle =  (e) => {
        e.preventDefault();}
    return (
        <>
      
        <div className={props.Name}>

        <form onSubmit={props.formHandle ?? formHandle} encType="multipart/form-data" method="post">   
            {field.map(
                (x,index) => 
                    
                        <Input
                            className={"border-2 p-1 mt-5"}
                            name={x.Name}
                            key={x.Id}
                            id={x.Id}
                            labelName={x.LabelName}
                            type={x.Type}/>   
                            
                        )}
                        <Button
                            buttonName="submit-button w-2/4 hover:text-white "
                            name={props.buttonName}
                            buttonType='submit' />
        </form>
        </div>
        </>
    );
}
export default Form;