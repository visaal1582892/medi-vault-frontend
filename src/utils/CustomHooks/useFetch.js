import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => setData(result.data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error }
}

export default useFetch;