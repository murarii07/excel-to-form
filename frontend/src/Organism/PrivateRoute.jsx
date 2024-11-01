import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "../fetchData";
import { changeIsLoginValue } from "../redux/flag";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login";
function PrivateRoute({element}) {
    const navigate=useNavigate
    const dispatch=useDispatch()
    const [isLog, setIsLog] = useState(true);
    useEffect(() => {
        // const d = await fetchData("http://localhost:5000/user", {
        //     methods: 'GET',
        //     credentials: 'include'
        // })
        // if (!d.success) {
            // setEr(true);
            // dispatch(changeIsLoginValue(true))
            
        // }
    }, [])
    return isLog ? <Navigate to="/login" /> : element
}
export default PrivateRoute;