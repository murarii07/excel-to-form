import Img from "./img";

const NotFound=()=>{
return(
    <>
    <div className="relative flex items-center flex-col justify-center  gap-5 z-10 w-7/12 mx-auto">
    <h1 className="text-3xl font-bold  text-purple-600 flex justify-center items-center">404 ERROR</h1>
    <Img img={"/assets/image.png"} width="304" height="316"/>
    <div>

    <h1 className="text-[68px] font-bold text-center text-purple-600">No Results Found</h1>
    <div className="text-xl font-medium  text-gray-400 flex justify-center items-center text-center w-3/4 mx-auto">We couldn’t find what you searched for.
    Try searching again.</div>
    </div>
    </div>
    <div className="flex justify-between absolute  w-full " style={{top:"58%", zIndex:0}}>

    <Img img={"/assets/image copy.png"} width="177" height="264"/>
    <Img img={"/assets/image copy 2.png"} width="177" height="264"/>
    </div>
    
    </>
)
}
export default NotFound;