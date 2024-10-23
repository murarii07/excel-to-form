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
                            name={x.Name}
                            key={index}
                            id={x.Id}
                            labelName={x.labelName}
                            type={x.Type}/>   
                            
                        )}
                        <Button
                            buttonName="submit-button  border-green-500 text-green-500 hover:bg-green-500 hover:text-white "
                            name='Generate'
                            buttonType='submit' />
        </form>
        </div>
        </>
    );
}
export default Form;