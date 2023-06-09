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
      .get(`${apiURL}/users/${username}`)
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

  const follow = async (userId: string) => {
    try {
      const response = await axios.post(`${apiURL}/users/${userId}/follow`);
      setProfile((prevProfile) =>
        prevProfile
          ? { ...prevProfile, following: [...prevProfile.following, userId] }
          : null
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async (userId: string) => {
    try {
      const response = await axios.post(`${apiURL}/users/${userId}/unfollow`);
      setProfile((prevProfile) =>
        prevProfile
          ? {
              ...prevProfile,
              following: prevProfile.following.filter((id) => id !== userId),
            }
          : null
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { loading, error, profile, posts, follow, unfollow };
}
