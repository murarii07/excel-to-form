import Button from "../Atoms/Button";
import {ReactComponent as HomeIcon} from '../svgs/home.svg'
import {ReactComponent as TasksIcon} from '../svgs/tasks.svg'
import {ReactComponent as AccountIcon} from '../svgs/myAccount.svg'
import { useNavigate } from "react-router-dom";
function SideBar({ handle }) {
    const navigate=useNavigate();
    return (
        <div className="sidebar border-2  overflow-hidden h-screen absolute top-1 bg-purple-900 z-10 border-purple-900 hover:w-60" style={{width:"240px"}}>
            <ul className=" mt-10 grid grid-cols-1  box-border ">
                {
                    [
                        {
                            name: "MyAccount", link: "my-profile", svg: (<AccountIcon />)     
                        },
                        {
                            name: "Mytasks", link: "tasks", svg: (<TasksIcon />)
                            
                        },
                        { name: "Home", link: "",svg:
                            (<HomeIcon />) }
                    ].map((x, index) => (

                        <li key={index} className="flex hover:bg-teal-200 p-4 text-white hover:text-teal-900 cursor-pointer " onClick={()=>{
                            navigate(`/${x.link}`)
                        }}>
                            {x.svg}
                            <div >{x.name}</div>

                        </li>

                    ))
                }
            </ul>
            <Button name="X" buttonName={"w-7 max-h-4 text-white absolute z-20 border-none bg-purple-800 top-1 left-2"} onClick={handle} />
        </div>
    )
}
export default SideBar;