function Form() {
    const fetchData=async (file,url)=>{
        try{
            const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:file
            })
            const j=await r.json();
            return j;
        }
        catch(error){
            return false;
        }
    }
    const formHandle=(e)=>{
        e.preventDefault();
        const form=document.querySelector('form');
        const file=new FormData(form);
        const response=fetchData(file,"http://localhost:5000/genration");
        if(response.success){
            form.reset();
            //here  logic will be added for preview
            
        }
        else{
            console.log("OOPS!!! error occurs")
        }
    }
    return (
        <form onSubmit={(e) => formHandle(e)}  encType="multipart/form-data" method="post">
            <label htmlFor="excelFile">upload a file:</label>
            <input type="file" name='excelFile' /><br></br>
            <button type='submit'>Generate</button>
        </form>
    );
}
export default Form;