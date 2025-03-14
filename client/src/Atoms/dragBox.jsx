import { useCallback, useEffect, useState } from "react";
import Button from './Button'
import { useDropzone } from 'react-dropzone'
import UploadIcon from '../svgs/uploadIcon.svg?react'
const DragBox = ({ takingFile }) => {
    const [fileName, setFileName] = useState("");
    const [lo, isLo] = useState(100);
    const onDrop = useCallback((acceptedfile) => {
        if (acceptedfile.length) {
            console.log(acceptedfile[0])
            setFileName(acceptedfile[0])
            takingFile(acceptedfile[0])
            isLo(1)
        }

    });
    useEffect(() => {
        if (lo > 0 && lo < 100) {
            setTimeout(() => {
                isLo(s => s + 1)
            }, 2)
        }
    }, [lo])
    useEffect(() => {
        console.log(fileName)
    }, [fileName])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <>
            <div {...getRootProps()} className="dragBox    hover:border-purple-900 min-h-56 w-full m-auto   justify-center  font-bold cursor-pointer bg-purple-50 py-6 px-4 rounded-lg flex flex-col items-center md:py-8 md:px-6  md:mx-auto space-y-4 border border-dashed border-purple-500 shadow-sm hover:shadow-lg transition-shadow duration-300 ">
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
                        : !(lo === 100)
                            ? `you  upload ${fileName.name}`
                            : <>
                                <UploadIcon />
                                {/* <span className="material-symbols-outlined !text-purple-600 text-8xl mb-3">
        cloud_upload
      </span> */}
                                <div className="flex flex-col items-center justify-center gap-5">

                                    <p className="text-purple-900 text-center font-medium">
                                        Drag and drop files here or
                                    </p>
                                    <Button name={"Select File"} className="mt-2 px-5 py-2 bg-white border border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white" />
                                    <p className=" text-sm text-neutral-500 text-center">
                                        Supported format: xlsx
                                    </p>
                                </div>
                            </>
                    }


                </div>
            </div>

            {fileName &&
                (
                    <>
                        {!(lo === 100) ? <div className="w-2/4 bg-gray-200 rounded-full h-2.5 dark:bg-purple-300">
                            <div className="bg-purple-700 h-2.5 rounded-full" style={{ width: `${lo}%` }}></div>
                        </div> : <div className="w-full flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-purple-100 py-3 px-4 rounded-2xl md:py-4 md:px-6">
                            <div className="text-left max-w-full md:max-w-[75%] truncate">
                                <p className="text-neutral-800 font-semibold truncate">
                                    {fileName.name}
                                </p>
                                <p className="text-neutral-500 text-sm">
                                    File size:{' '}
                                    <span className="font-medium text-purple-500">{(fileName.size / 1000).toFixed(2)}KB</span>
                                </p>
                            </div>
                            <Button className="text-purple-500 hover:text-purple-600" onClick={() => {
                                setFileName(null)
                                takingFile(null)
                            }}
                                name={<span className="material-symbols-outlined">close</span>}
                            />
                        </div >}




                    </>)}

            {/* <div className="w-3/4">
                {fileName &&
                    <>
                        <div className="flex justify-center w-full items-center gap-4">

                            <span className="text-center">
                                {fileName.name}
                            </span>
                            {!(lo === 100) && <div className="w-2/4 bg-gray-200 rounded-full h-2.5 dark:bg-purple-300">
                                <div className="bg-purple-800 h-2.5 rounded-full" style={{ width: `${lo}%` }}></div>
                            </div>}
                            <div>
                                {(fileName.size / (1024)).toFixed(2)}KB
                            </div>


                            <Button name={"X"} className="text-gray-400 submit-button border-gray-400 w-1/12 hover:text-white hover:bg-gray-400 hover:font-bold" onClick={() => {
                                setFileName(null)
                                takingFile(null)
                            }} />

                        </div>
                    </>}
            </div> */}
        </>
    )
}
export default DragBox;