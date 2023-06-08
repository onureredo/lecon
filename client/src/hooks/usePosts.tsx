import { useState, useEffect } from 'react';
import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function usePosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/posts`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { loading, error, posts };
}
