import { useEffect, useState } from 'react';

const useFetch = (url = '', opt = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, opt)
      .then(res => res.json())
      .then(json => {
        setError(null);
        setData(json)
      })
      .catch(() => {
        setError('something went wrong... Akkwrd');
        setData(null);
      })
      .finally(() => setLoading(false));

  }, [url]);

  return { response: data, error, loading };
}

export default useFetch;
