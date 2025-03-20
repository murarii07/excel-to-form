import { useDispatch, useSelector } from "react-redux";
import { changeFieldValue } from "../redux/formElement";
import Button from "../Atoms/Button.jsx";
import DragBox from "../Atoms/dragBox";
import { useEffect, useState } from "react";
import SkeletonLoading from "../Atoms/SkeletionLoading.jsx";
import useFetchData from "../CustomHooks/useFetchData.jsx";
import DialogBox from "../Atoms/DialogBox.jsx";
import { useNavigate } from "react-router-dom";

function XlUpload() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((s) => s.Field.value);
    const [file, setFile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const fields = useSelector(s => s.Field.value);
    const [er, setEr] = useState(false);
    const [response, error, setOptions] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/form/generate`);
    const [dialog, setDialog] = useState({ flag: false, message: "error....." });

    const takingFile = (file) => {
        setFile(file);
    };

    const changingValue = ((value) => {
        dispatch((changeFieldValue(value)));
    });

    const formHandle = async () => {
        setEr(false);
        if (!file) {
            setDialog({
                flag: true,
                message: "Please upload file"
            });
            return;
        }
        if (fields.length) {
            dispatch(changeFieldValue([]));
        }
        setIsLoad(true);
        const files = new FormData();
        files.append("excelFile", file);
        setOptions({ method: "POST", credentials: 'include', body: files });
    };

    useEffect(() => {
        if (response && !error) {
            // Stop loader when request completes
            // here logic will be added for preview
            console.log(response.data);
            const res = response.data.map(x => {
                x.key = x.Id;
                return ({ ...x });
            });
            changingValue(res);
            navigate("/edit");
            setIsLoad(false);
        }
        else if (error) {
            setFile(null);
            setIsLoad(false);
            setEr(true);
            console.log();
            setDialog({ flag: true, message: "OOPS!!! error occurs Try again Later" });
            setTimeout(() => window.location.reload(), 2000);
        }
    }, [response, error]);

    useEffect(() => {
        console.log("sd");
    }, [data]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Excel Upload</h1>
                            <p className="text-gray-600">Upload your Excel file to generate form fields</p>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-6">
                            {data.length ? (
                                <div className="w-full">
                                    <label htmlFor="newUpload" className="block text-sm font-medium text-gray-700 mb-2">
                                        Ready to upload a different file?
                                    </label>
                                    <Button
                                        name={"New Upload"}
                                        buttonName={"bg-purple-600 text-neutral-50 py-3 px-8 rounded-full w-full md:w-auto hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"}
                                        title={"Upload a new file"}
                                        onClick={() => changingValue([])}
                                        id="newUpload"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-full">
                                        <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700 mb-2">
                                            Select or drag your Excel file here
                                        </label>
                                        <DragBox takingFile={takingFile} id="fileUpload" />
                                    </div>

                                    <div className="w-full">
                                        <label htmlFor="generateButton" className="block text-sm font-medium text-gray-700 mb-2">
                                            Process your file
                                        </label>
                                        <Button
                                            name={"Generate"}
                                            buttonName={"bg-purple-600 text-neutral-50 py-3 px-8 rounded-full w-full md:w-auto hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"}
                                            onClick={formHandle}
                                            id="generateButton"
                                        />
                                    </div>

                                    {!er && isLoad && (
                                        <div className="w-full mt-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Processing your file...
                                            </label>
                                            <SkeletonLoading />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 sm:px-10 border-t border-gray-100">
                        <p className="text-sm text-gray-500 text-center">
                            Only Excel files (.xlsx, .xls) are supported
                        </p>
                    </div>
                </div>
            </div>

            <DialogBox isOpen={dialog.flag} message={dialog.message} setDialog={setDialog} />
        </div>
    );
}

export default XlUpload;