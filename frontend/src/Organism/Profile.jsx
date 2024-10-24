const Profile=()=>{
return(<>
<div className="user-dp w-7/12  m-auto mt-5  rounded-md  border-2">
    <div className="font-bold text-center ">
        User profile
        </div>
    <div className="userImg  m-auto  rounded-md  border-2">d</div>
</div>

{/* tasks */}
<a href="http://localhost:3000/tasks">
<div className="MyTasks mx-auto mt-10 w-11/12 box-border px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer">My projects</div>
</a>

{/* storage bar */}
<div className="storage w-11/12 mx-auto mt-10 px-12 py-3 min-h-14 border-2 rounded-lg cursor-pointer">storagebar</div>
</>)
}
export default Profile;