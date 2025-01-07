import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Button from "../Atoms/Button.jsx";
import DragBox from "../Atoms/dragBox";
import { useEffect, useState } from "react";
import SkeletonLoading from "../Atoms/SkeletionLoading.jsx";
import useFetchData from "../CustomHooks/fetchData.jsx";
import DialogBox from "../Atoms/DialogBox.jsx";

function XlUpload() {
    const [file, setFile] = useState(null)
    const [isLoad, setIsLoad] = useState(false)
    const dispatch = useDispatch();
    const fields = useSelector(s => s.Field.value)
    const [er, setEr] = useState(false);
    const url = `${import.meta.env.VITE_SERVER_API_URL}/form/generate`
    const { response, error, setOptions } = useFetchData(url)
    const [dialog,setDialog]=useState({flag:false,message:"error....."})
    const takingFile = (file) => {
        setFile(file)
    }
    const formHandle = async () => {
        setEr(false)
        if (!file) {
            setDialog({
                flag:true,
                message:"please upload file"
            })
            return
        }
        if (fields.length) {
            dispatch(changeFieldValue([]))
        }
        setIsLoad(true)
        const files = new FormData();
        files.append("excelFile", file)
        setOptions({ method: "POST", credentials: 'include', body: files })

    }
    useEffect(() => {
        if (error) {
            setFile(null)
            setIsLoad(false)
            setEr(true)
            console.log()
            setDialog({flag:true,message:"OOPS!!! error occurs Try again Later"})
        }
    }, [error])

    useEffect(() => {
        if (response && !error) {
            // Stop loader when request completes
            //here  logic will be added for preview
            console.log(response.data)
            dispatch(changeFieldValue(response.data))
            setIsLoad(false)
        }

    }, [response]);
    return (
        <>
            <div className="drag-form  w-10/12 m-auto min-h-fit flex flex-col items-center justify-center gap-5">
                <>
                    <DragBox takingFile={takingFile} />
                    <Button
                        name={"Generate"}
                        buttonName={"text-purple-600 submit-button border-purple-600 w-4/12 md:w-2/12 hover:text-white hover:bg-purple-600 hover:font-bold border-2 "}
                        onClick={formHandle} />

                    {
                        !er ?
                            isLoad && <SkeletonLoading /> : ""}

                </>
            </div>
            <DialogBox isOpen={dialog.flag} message={dialog.message} setDialog={setDialog} />
        </>

    );
}
export default XlUpload;
