import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint);
      setLoading(false);
      setData(response.data.results);
      // console.log();
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
