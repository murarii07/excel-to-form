import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
const DragBox = ({ takingFile }) => {
    const [fileName, setFileName] = useState("");
    const onDrop = useCallback((acceptedfile) => {
        if (acceptedfile.length > 0) {
            console.log(acceptedfile[0].name)
            setFileName(acceptedfile[0].name)
            takingFile(acceptedfile[0])
        }

    });
    useEffect(() => {
        console.log(fileName)
    }, [fileName])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div {...getRootProps()} className="dragBox  border-dashed border-2 hover:border-gray-700 min-h-48 w-3/4 m-auto bg-teal-200 rounded-md flex items-center  justify-center  font-bold">
            <input {...getInputProps({
                name: "files",
                type: "file",
                id: "file",
                className: "pl-70 border-2",
            })} />

            <p className="text-center text-green-950">

                {isDragActive
                    ? `${fileName ? `${fileName} dropped...` : "Drop the file here..."}`
                    : fileName
                        ? `${fileName}`
                        : "Drop files here or select file"}


            </p>
        </div>
    )
}
export default DragBox;