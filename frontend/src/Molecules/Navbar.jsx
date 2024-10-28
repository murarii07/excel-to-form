function Nav(props){
    if(props.flag){

        return(
            <div className="navbar  my-3 mb-10 w-11/12 m-auto">
                <ul className="flex justify-between"> 
                    <li>FormX</li>
                    <li>
                        userdp
                        </li>
                </ul>
            </div>
           
        )
    }
    else{
        return(
            <div className="navbar mx-12  my-3 border-2 rounded-md h-11 border-black w-4/5">
                <ul className="flex justify-evenly"> 
                    <li>logo</li>
                    <li><a href="/login" target="_blank">login</a></li>
                    <li><a href="/signup" target="_blank">signup</a></li>
                </ul>
            </div>
        )
    }
}
export default Nav;