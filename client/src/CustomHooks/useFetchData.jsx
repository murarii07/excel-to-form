import { useEffect, useState } from "react";

const useFetchData = (url, opt = {}) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(opt)
    const fetchOperation = async () => {
        // const controller = new AbortController()
        // const signal = controller.signal
        try {
            let response = await fetch(url, { ...options })
            if (!response.ok) {
                throw new Error("Bad request");
            }
            let res = await response.json();
            if (!res.success) {
                throw new Error(res.message);
            }
            console.log("FFFFFFF", res)
            setResponse({ ...res })
            if (error) {
                setError(null)
            }
            return;
        }
        catch (e) {
            setError(e)
            setResponse(null)
        }

    }
    useEffect(() => {
        console.log(options)
        if (Object.keys(options).length > 0) {
            fetchOperation()
        }

    }, [options])
    useEffect(() => {
        console.log(response)
    }, [response])
    return [response, error, setOptions]
}
export default useFetchData