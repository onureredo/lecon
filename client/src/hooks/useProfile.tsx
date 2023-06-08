import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProfile(username: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://lecon-app.onrender.com/${username}`)
      .then((response) => {
        setProfile(response.data.user);
        setPosts(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [username]);

  return { loading, error, profile, posts };
}
