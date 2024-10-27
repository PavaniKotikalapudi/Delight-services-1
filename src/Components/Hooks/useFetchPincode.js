// src/hooks/useFetchPincode.js

import { useEffect, useState } from 'react';

const useFetchPincode = (pincode) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pincode) return; // Do not fetch if pincode is empty
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pincode]);

  return { data, loading, error };
};

export default useFetchPincode;
