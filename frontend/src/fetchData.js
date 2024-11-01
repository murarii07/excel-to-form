export  const fetchData = async (url, options) => {
    try {
        let response = await fetch(url, options)
        let resJson = await response.json();
        return resJson;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}