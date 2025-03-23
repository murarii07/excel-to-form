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

    if (loading) return <h1>Loading.......</h1>;

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {/* Column headers */}
                        <th scope="col" className="px-6 py-3">File Metadata</th> {/* Dedicated column for file URLs */}
                        {col.map((field) => (
                            <th scope="col" className="px-6 py-3" key={field}>
                                {field}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((x) => (
                        <tr key={x._id}>
                            <td className="px-6 py-3">
                                {x.file_metadata.length ? (
                                    x.file_metadata.map((z) => (
                                        <a key={z.file_url} href={z.file_url}>{z.file_url}</a>
                                    ))
                                ) : (
                                    "null"
                                )}
                            </td>
                            {col.map((field) => (
                                <td className="px-6 py-3" key={`${x._id}-${field}`}>
                                    {x.response_data[field] || "N/A"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Responses;
