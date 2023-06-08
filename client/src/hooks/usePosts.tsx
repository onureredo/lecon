import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://lecon-app.onrender.com/posts')
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
