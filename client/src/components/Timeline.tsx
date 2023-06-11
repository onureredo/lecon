import { useAuth } from '@/context/AuthContext';
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

export const Timeline: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { posts, likePost, unlikePost } = usePosts();

  const handleToggleLike = async (postId: string) => {
    const post = posts.find((post) => post._id === postId);
    if (post && user) {
      // Added user null check here
      if (post.likes.includes(user._id)) {
        // if the user has liked this post
        await unlikePost(postId);
      } else {
        // if the user hasn't liked this post
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
    <div className='flex justify-center items-center'>
      <div className='sm:max-w-xl flex flex-col items-center overflow-hidden'>
        <div className='max-w-full mb-20'>
          {[...posts].map((post) => {
            const formattedDate = formatPostDate(post.createdAt);
            const formattedTitleDate = formatTitleDate(post.createdAt);

            return (
              <div
                key={post._id}
                className='shadow w-full border border-gray-800'
              >
                <div className='flex items-start m-6 cursor-default'>
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
                        {post.author ? (
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
                    <p
                      className='text-white mt-2 white'
                      style={{ wordBreak: 'break-word' }}
                    >
                      {post.content}
                    </p>
                    <div className='flex items-center mt-2 text-md space-x-6 sm:space-x-8'>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faComment}
                          className='text-gray-400 mr-1 md:hover:text-blue-500'
                          title='Reply'
                        />
                        <span className='text-gray-400'>
                          {post.comments.length}
                        </span>
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faRetweet}
                          className='text-gray-400 mr-1 md:hover:text-green-600'
                          title='Retweet'
                        />
                        <span className='text-gray-400'>
                          {post.reposts.length}
                        </span>
                      </div>
                      <div className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`${
                            user && post.likes.includes(user._id) // Added user null check here
                              ? 'text-red-500'
                              : 'text-gray-400'
                          } mr-1 md:hover:text-red-500`}
                          title='Like'
                          onClick={() => handleToggleLike(post._id)}
                        />
                        <span className='text-gray-400'>
                          {post.likes.length}
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
                      <div className='flex items-center cursor-pointer'></div>
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
