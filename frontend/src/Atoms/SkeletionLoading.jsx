import { useEffect, useState } from "react";


function  SkeletonLoading(){
    const [s,seD]=useState(0)
    const handle=()=>{
          console.log(s)
        seD(s=>s+1)
    }
    useEffect(()=>{
        if(s<100 && s>0){
    
            setTimeout(handle,100)
           
        }
    
    },[s])
    return(
<>
        
        <div className="mt-10 border border-gray-100 shadow rounded-md p-4 w-11/12 mx-auto">
  <div className="animate-pulse flex space-x-4">
    {/* <div className="rounded-full bg-slate-300 h-10 w-10"></div> */}
    <div className="flex-1 space-y-6 py-1">
      <div className="h-20 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
      <div className="h-20 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
      
    </div>
  </div>
</div>
</>
    );
}
export default SkeletonLoading;