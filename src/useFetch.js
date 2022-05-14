import {
    useState,
    useEffect
} from "react";
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        const abortConst = new AbortController();
        fetch(url, {
                signal: abortConst.signal
            }).then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data');
                }
                setError(null)
                return res.json()
            }).then((data) => {
                setData(data)
                setIsPending(false)
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch Aborted');
                } else {
                    setIsPending(false)
                    setError(err.message)
                }

            })
        return () => abortConst.abort();
    }, [url])
    return {
        data,
        isPending,
        error
    };
}
export default useFetch;