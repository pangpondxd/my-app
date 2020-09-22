import {useEffect, useState} from "react";
import axios from "axios";

export const useGetPosts = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState()
    useEffect( () => {
        const getTable = async () => {
        const result = await axios
            .get("https://baan-racadee.herokuapp.com/phuket")
            .then((x) => x);
        const resultSongkhla = await axios
            .get("https://baan-racadee.herokuapp.com/songkhla")
            .then((x) => x);
        setData([...result.data, ...resultSongkhla.data]);
        if(result.status !== 200) {
            setError(result.json())
        }
        setLoading(false)
        }
        getTable()
    }, []);
    return {loading,data, error}
}
