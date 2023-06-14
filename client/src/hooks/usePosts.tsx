import { useState, useEffect } from 'react';
import { Post, APIError } from '@/types';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function usePosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get<Post[]>(`${apiURL}/posts`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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
      console.log(likedPost);
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
      console.log(unlikedPost);
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

  return { loading, error, posts, likePost, unlikePost, updatePost };
}
