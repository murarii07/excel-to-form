function Preview(){
    const fields=[]
    
    return(
        <>
        <div className="peview-form">
            <form action="">
            {fields.map((x,index)=>(<input type={x.tt} name={x.name} id={x.id} className={x.id} key={index}></input>))}
            this is preview of form
            <button type="submit">submit</button>
            </form>
        </div>
        {/* <span>is this correct?</span><br />
        <button>yes</button>
        <button>no</button> */}
        <button > <a href="http://localhost:5000/download" download={"form.html"}>download</a></button>
        </>
    );
}
export default Preview;