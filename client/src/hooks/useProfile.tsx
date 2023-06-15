import { useState, useEffect } from 'react';
import { User, Post, APIError } from '../types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function useProfile(username: string) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiURL}/users/${username}`)
      .then((response) => {
        setProfile(response.data.user);
        setPosts(response.data.posts);
        setLoading(false);
        // Check if current user is following the profile user
        if (user && response.data.user.followers.includes(user._id)) {
          setIsFollowing(true);
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [username, user]);

  const follow = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${profile?._id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsFollowing(true);
      } else {
        console.log('Failed to follow user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${profile?._id}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsFollowing(false);
      } else {
        console.log('Failed to unfollow user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loading,
    error,
    profile,
    posts,
    follow,
    unfollow,
    isFollowing,
  };
}
