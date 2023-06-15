import { useState, useEffect } from 'react';
import { User, Post, APIError } from '../types';
import Cookies from 'js-cookie';
import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function useProfile(username: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isFollowing, setIsFollowing] = useState(false); // Add this line
  const token = Cookies.get('token');

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

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (profile && userId) {
      setIsFollowing(profile.followers.includes(userId.toString())); // convert userId to string
    }
  }, [profile]);

  const follow = async (userId: string) => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${userId}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check the response status code or success message
      if (response.status === 200) {
        setProfile((prevProfile) =>
          prevProfile
            ? { ...prevProfile, following: [...prevProfile.following, userId] }
            : null
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async (userId: string) => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${userId}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check the response status code or success message
      if (response.status === 200) {
        setProfile((prevProfile) =>
          prevProfile
            ? {
                ...prevProfile,
                following: prevProfile.following.filter((id) => id !== userId),
              }
            : null
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { loading, error, profile, posts, follow, unfollow, isFollowing };
}
