import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Post } from '../types';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function useProfile(username: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/${username}`)
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
