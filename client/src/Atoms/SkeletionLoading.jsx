import { useEffect, useState } from "react";

function SkeletonLoading() {
  const [counter, setCounter] = useState(0);
  
  const handleIncrement = () => {
    console.log(counter);
    setCounter(prevCounter => prevCounter + 1);
  };
  
  useEffect(() => {
    if (counter > 0 && counter < 100) {
      const timer = setTimeout(handleIncrement, 100);
      return () => clearTimeout(timer);
    }
  }, [counter]);
  
  return (
    <>
      <div className="mt-10 border border-gray-100 shadow rounded-md p-4 w-11/12 mx-auto">
        <label htmlFor="skeletonSection" className="sr-only">Loading content</label>
        <div id="skeletonSection" className="animate-pulse flex space-x-4">
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