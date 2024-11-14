import { useEffect, useState } from "react"
import Nav from "../Molecules/Navbar"
import Preview from "../Molecules/preview"
import XlUpload from "../Molecules/xlUpload"

const Home=()=>{
    const [flag,setFlag]=useState(window.localStorage.getItem("isLogged"))
    useEffect(()=>{
        console.log(window.localStorage.getItem("isLogged"))
        setFlag(window.localStorage.getItem("isLogged"))
        
    },[flag])
    return(
        <>
        <Nav flag={flag} />
        <XlUpload />
        <Preview />
        </>
    )
}
export default Home