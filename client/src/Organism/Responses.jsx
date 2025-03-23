import { useNavigate } from "react-router-dom";
import useFetchData from "../CustomHooks/useFetchData";
import { useState, useEffect } from "react";

const Responses = () => {
    const [data, setData] = useState([]);
    const [col, setCol] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formName] = useState(window.location.pathname.split("/").pop());
    const [response, error] = useFetchData(`${import.meta.env.VITE_SERVER_API_URL}/user/v1/response/${formName}`, {
        method: "GET",
        credentials: "include" // Sends cookies with the request
    });

    useEffect(() => {
        if (response && !error) {
            setLoading(false);
            setCol(response.data.fields);
            setData(response.data.responses);
            console.log(response.data);
        } else if (error) {
            navigate("/error");
        }
    }, [response, error, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
                    <span className="mt-4 text-lg font-medium text-gray-700">Loading responses...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Response Data</h1>
                <p className="text-gray-600">Viewing responses for form: <span className="font-medium text-blue-600">{formName}</span></p>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">
                                <div className="flex items-center space-x-1">
                                    <span>

                                        File Metadata</span>
                                    <span className="material-symbols-outlined">
                                        description
                                    </span>

                                </div>
                            </th>
                            {col.map((field) => (
                                <th scope="col" className="px-6 py-4 font-semibold tracking-wider" key={field}>
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.length > 0 ? (
                            data.map((x) => (
                                <tr key={x._id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                                    <td className="px-6 py-4">
                                        {x.file_metadata && x.file_metadata.length ? (
                                            <div className="space-y-2">
                                                {x.file_metadata.map((z) => (
                                                    <a
                                                        key={z.file_url}
                                                        href={z.file_url}
                                                        className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150 truncate max-w-xs"
                                                        target="_blank"

                                                    >
                                                        {/* not showing which url is occurred */}
                                                        {z.file_url.split('/').pop()}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">No files</span>
                                        )}
                                    </td>
                                    {col.map((field) => (
                                        <td className="px-6 py-4" key={`${x._id}-${field}`}>
                                            {x.response_data[field] ? (
                                                <span>{x.response_data[field]}</span>
                                            ) : (
                                                <span className="text-gray-400 italic">N/A</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={col.length + 1} className="px-6 py-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center">
                                        <p className="text-lg font-medium">No responses found</p>
                                        <p className="text-sm mt-1">There are currently no responses for this form.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {data.length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                    Showing {data.length} {data.length === 1 ? 'response' : 'responses'}
                </div>
            )}
        </div>
    );
};

export default Responses;