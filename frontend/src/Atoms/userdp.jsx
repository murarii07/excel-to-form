import Button from "./Button"

const UserDp=()=>{

    return(
        <div className="border-2 border-purple-100 rounded-xl w-60 flex flex-col justify-center gap-2 box-border min-h-32  shadow-md absolute top-10 right-2 bg-purple-50 shadow-purple-100">
          <div className="px-5 border-b-2 border-purple-100 ">My Account</div>
            <div className="px-5 border-b-2 border-purple-100 ">Storage</div>
            <div className="px-5 "><Button name="logout" buttonName={"bg-red-500 border-2 border-red-500 text-white p-1"} /></div>
        </div>
    )
}
export default UserDp