import { useEffect, useState } from "react";

 const useFetchData = (url, opt = {}) => {
    const [response, setresponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(opt)
    const fetchOperation = async () => {
        // const controller = new AbortController()
        // const signal = controller.signal
        try {
            let response = await fetch(url, { ...options })
            if (!response.ok) {
                throw new Error(response);
            }
            let res = await response.json();
            if (!res.success) {
                throw new Error(res.message);
            }
            setresponse(res)
            return;
        }
        catch (e) {
            setError(e)
        }

    }
    useEffect(() => {
        if (Object.keys(options).length > 0) {
            fetchOperation()
        }

    }, [options])
    return [response, error, setOptions]
}
export default useFetchData