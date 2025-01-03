import { useCallback, useEffect, useState } from "react";
import Button from './Button'
import { useDropzone } from 'react-dropzone'
import  UploadIcon   from '../svgs/uploadIcon.svg?react'
const DragBox = ({ takingFile }) => {
    const [fileName, setFileName] = useState("");
    const [lo,isLo]=useState(100);
    const onDrop = useCallback((acceptedfile) => {
        if (acceptedfile.length) {
            console.log(acceptedfile[0])
            setFileName(acceptedfile[0])
            takingFile(acceptedfile[0])
            isLo(1)
        }

    });
    useEffect(()=>{
        if(lo>0 && lo<100){
            setTimeout(()=>{
                isLo(s=>s+1)
            },2)
        }
    },[lo])
    useEffect(() => {
        console.log(fileName)
    }, [fileName])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <>
            <div {...getRootProps()} className="dragBox  border-dashed border-2 hover:border-purple-900 min-h-56 w-3/4 m-auto bg-purple-200 rounded-md flex items-center  justify-center  font-bold cursor-pointer">
                <input {...getInputProps({
                    name: "files",
                    type: "file",
                    id: "file",
                    className: "pl-70 border-2",
                })} />

                <div className="text-center text-purple-950">

                    {isDragActive
                        ?
                         `${fileName.name ? `${fileName.name} dropped...` : "Drop the file here..."}`
                        : !(lo===100)
                            ? `you  upload ${fileName.name}`
                            : <>
                                <UploadIcon />
                                <div className="flex flex-col items-center justify-center gap-5">
                                
                                    <div className="">
                                        Drop files here or select file

                                    </div>
                                    <Button name={"select file"} className="text-purple-600 submit-button border-purple-600 w-2/4 hover:text-white hover:bg-purple-600 hover:font-bold border-2" />
                                </div>
                            </>
                    }


                </div>
            </div>
            <div className="w-3/4">
                {fileName &&
                <>
                <div className="flex justify-center w-full items-center gap-4">

                    <span className="text-center">
                        {fileName.name}
                    </span>
                   {!(lo===100) &&  <div className="w-2/4 bg-gray-200 rounded-full h-2.5 dark:bg-purple-300">
                        <div className="bg-purple-800 h-2.5 rounded-full" style={{width:`${lo}%`}}></div>
                    </div>}
                        <div>
                        {(fileName.size / (1024)).toFixed(2)}KB
                        </div>


                        <Button name={"X"} className="text-gray-400 submit-button border-gray-400 w-1/12 hover:text-white hover:bg-gray-400 hover:font-bold" onClick={()=>{
                            setFileName(null)
                            takingFile(null)
                        }} />
                        
                        </div>
                </>}
            </div>
        </>
    )
}
export default DragBox;