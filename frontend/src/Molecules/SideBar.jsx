import Button from "../Atoms/Button";

function SideBar({handle}){
    return(
        <div className="sidebar border-2 w-60 h-screen absolute top-1 bg-purple-900 z-10 border-purple-900">
            <ul className=" mt-10 grid grid-cols-1  box-border ">
                {
                [
                    {name:"MyAccount",link:"/my-profile"},
                    {name:"Mytasks",link:"/tasks"},
                    {name:"Home",link:"/"}
                ].map((x,index)=>(

                    <li key={index} className=" hover:bg-teal-200 p-4 text-white hover:text-teal-900"><a href={`${x.link}`} target="_blank" rel="noopener noreferrer">{x.name}</a></li>
       
                ))
}
            </ul>
            <Button name="X" buttonName={"w-7 max-h-4 text-white absolute z-20 border-none bg-purple-800 top-1 left-2"} onClick={handle} />
        </div>
    )
}
export  default SideBar;