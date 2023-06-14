import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatPostDate, formatTitleDate } from '@/utils/dateFormat';
import Link from 'next/link';
import Image from 'next/image';
import {
  faHeart,
  faRetweet,
  faComment,
  faShareNodes,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import { NewPost } from './NewPost';

export const Timeline: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { posts, likePost, unlikePost } = usePosts(user, isLoading);

  const handleToggleLike = async (postId: string) => {
    const post = posts.find((post) => post._id === postId);
    if (post && user) {
      if (post.likes.includes(user._id)) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    }
  };

  if (isLoading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <InfinitySpin width='148' color='#bb3855' />
      </div>
    );
  }
  return (
    <div className='flex justify-center items-center overflow-auto'>
      <div className='sm:max-w-xl flex flex-col items-center overflow-auto mb-20 w-full'>
        <NewPost />
        <div className='w-full overflow-auto'>
          {[...posts].map((post) => {
            const formattedDate = post.createdAt
              ? formatPostDate(post.createdAt)
              : '';
            const formattedTitleDate = post.createdAt
              ? formatTitleDate(post.createdAt)
              : '';

            return (
              <div
                key={post._id}
                className='shadow w-full border border-gray-800 overflow-hidden'
              >
                <div className='flex items-start p-4 cursor-default'>
                  <div className='flex-shrink-0 mr-4'>
                    {post.author && post.author.profileImage ? (
                      <Image
                        className='h-12 w-12 object-cover rounded-full'
                        src={post.author.profileImage}
                        alt='User Avatar'
                        draggable={false}
                        height={48}
                        width={48}
                      />
                    ) : (
                      <Image
                        className='h-12 w-12 object-cover rounded-full'
                        src='https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg='
                        alt='Default User Avatar'
                        draggable={false}
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <div className='flex flex-col flex-grow'>
                    <div className='flex items-center w-screen'>
                      <h2 className='font-bold text-gray-200 flex items-center text-lg max-sm:text-sm'>
                        {isLoading ? (
                          <span>Loading...</span>
                        ) : post.author ? (
                          <span>
                            {post.author.firstName}{' '}
                            {post.author.lastName.length > 8
                              ? `${post.author.lastName.charAt(0)}.`
                              : post.author.lastName}
                          </span>
                        ) : (
                          'Deleted User'
                        )}
                      </h2>
                      <h2 className=' flex items-center max-sm:text-sm text-md'>
                        <span
                          className='ml-1 text-gray-500 cursor-pointer'
                          title={formattedTitleDate}
                        >
                          @
                          {post.author ? (
                            <Link href={`/${post.author.username}`}>
                              {post.author.username}
                            </Link>
                          ) : (
                            'Deleted User'
                          )}{' '}
                          · {formattedDate}
                        </span>
                      </h2>
                    </div>
                    <div className='max-xs:w-72 overflow-auto'>
                      <p className='text-white mt-2'>{post.content}</p>
                    </div>
                    <div className='flex items-center mt-2 text-md space-x-6 sm:space-x-8'>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faComment}
                          className='text-gray-400 mr-1 md:hover:text-blue-500'
                          title='Reply'
                        />
                        <span className='text-gray-400'>
                          {post.comments?.length || 0}
                        </span>
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faRetweet}
                          className='text-gray-400 mr-1 md:hover:text-green-600'
                          title='Retweet'
                        />
                        <span className='text-gray-400'>
                          {post.reposts?.length || 0}
                        </span>
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`${
                            user && post.likes?.includes(user._id)
                              ? 'text-red-500'
                              : 'text-gray-400'
                          } mr-1 md:hover:text-red-500`}
                          title='Like'
                          onClick={() => handleToggleLike(post._id)}
                        />
                        <span className='text-gray-400'>
                          {post.likes?.length || 0}
                        </span>
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faChartSimple}
                          className='text-gray-500 mr-1 md:hover:text-blue-500'
                          title='View'
                        />
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faShareNodes}
                          className='text-gray-500 mr-1 md:hover:text-blue-500'
                          title='Share'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
