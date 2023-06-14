import { useState, useEffect } from 'react';
import { Post, APIError, User } from '@/types';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function usePosts(user: User | null, isLoading: boolean) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get<Post[]>(`${apiURL}/posts`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [user]);

  const createPost = async (content: string) => {
    try {
      if (!user) {
        throw new Error('User is not authenticated');
      }
      const response = await axios.post<Post>(
        `${apiURL}/posts`,
        {
          author: user._id,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPost = response.data;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      console.error((error as AxiosError).response); // Log the error response for debugging
    }
  };

  const likePost = async (postId: string) => {
    try {
      const response = await axios.post<Post>(
        `${apiURL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const likedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? likedPost : post))
      );
    } catch (error) {
      console.error((error as AxiosError).response); // Log the error response for debugging
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      const response = await axios.delete<Post>(
        `${apiURL}/posts/${postId}/unlike`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const unlikedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? unlikedPost : post))
      );
    } catch (error) {
      console.error((error as AxiosError).response); // Log the error response for debugging
    }
  };

  const updatePost = (postId: string, updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === postId ? updatedPost : post))
    );
  };

  return {
    loading,
    error,
    posts,
    createPost,
    likePost,
    unlikePost,
    updatePost,
  };
}
