function Nav(){
return(
    <div className="navbar mx-12  my-3 border-2 rounded-md h-11 border-black w-4/5">
        <ul className="flex justify-evenly"> 
            <li>logo</li>
            <li><a href="/login" target="_blank">login</a></li>
            <li><a href="/login" target="_blank">signup</a></li>
        </ul>
    </div>
)
}
export default Nav;