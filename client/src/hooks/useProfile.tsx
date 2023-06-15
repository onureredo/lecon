import { useState, useEffect } from 'react';
import { User, Post, APIError } from '../types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function useProfile(username: string) {
  const { user } = useAuth();
  const [state, setState] = useState<{
    loading: boolean;
    error: APIError | null;
    profile: User | null;
    posts: Post[] | null;
    isFollowing: boolean;
    followersCount: number;
    followingCount: number;
  }>({
    loading: true,
    error: null,
    profile: null,
    posts: null,
    isFollowing: false,
    followersCount: 0,
    followingCount: 0,
  });
  const token = Cookies.get('token');

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));
    axios
      .get(`${apiURL}/users/${username}`)
      .then((response) => {
        setState({
          loading: false,
          error: null,
          profile: response.data.user,
          posts: response.data.posts,
          isFollowing: user && response.data.user.followers.includes(user._id),
          followersCount: response.data.user.followers.length,
          followingCount: response.data.user.following.length,
        });
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, loading: false, error }));
      });
  }, [username, user]);

  const follow = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/users/${state.profile?._id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setState((prev) => ({ ...prev, isFollowing: true }));
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
        `${apiURL}/users/${state.profile?._id}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setState((prev) => ({ ...prev, isFollowing: false }));
      } else {
        console.log('Failed to unfollow user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...state,
    follow,
    unfollow,
  };
}
