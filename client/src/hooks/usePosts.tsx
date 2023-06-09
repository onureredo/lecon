import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post, APIError } from '@/types';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export function usePosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<APIError | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

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
      const response = await axios.post<Post>(`${apiURL}/posts/${postId}/like`);
      const likedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? likedPost : post))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      const response = await axios.post<Post>(
        `${apiURL}/posts/${postId}/unlike`
      );
      const unlikedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? unlikedPost : post))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { loading, error, posts, likePost, unlikePost };
}
