import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LuVerified } from 'react-icons/lu';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  formatSignupDate,
  formatPostDate,
  formatTitleDate,
} from '@/utils/dateFormat';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Image from 'next/image';
import {
  faCalendarAlt,
  faChartSimple,
  faComment,
  faHeart,
  faLocationDot,
  faRetweet,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewPost } from '@/components/NewPost';
import Link from 'next/link';
import { usePosts } from '@/hooks/usePosts';

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const id = router.query.id as string | undefined;
  const { posts, likePost, unlikePost } = usePosts(user, isLoading);
  const {
    profile,
    loading,
    error,
    follow,
    unfollow,
    isFollowing,
    setIsFollowing,
  } = useProfile(id || '');

  useEffect(() => {
    if (user && profile && user.following.includes(profile._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, profile, setIsFollowing]);

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

  const handleToggleFollow = async () => {
    if (user && profile && profile._id) {
      try {
        if (isFollowing) {
          await unfollow(profile._id);
          setIsFollowing(false);
        } else {
          await follow(profile._id);
          setIsFollowing(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    return post.author?.username === id;
  });

  if (loading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <InfinitySpin width='148' color='#bb3855' />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className='border-2 border-gray-800'>
        <div className='flex flex-col justify-between items-start px-2 py-1'>
          <div className='w-full bg-rouge bg-opacity-50 backdrop-blur-sm text-2xl font-bold text-white'>
            {`${profile?.firstName} ${profile?.lastName}`}
          </div>
          <div className='text-md ml-0.5 text-gray-300'>
            {posts?.length} {posts?.length === 1 ? 'Post' : 'Posts'}
          </div>
        </div>
        <div className='text-white'>
          <div id='profile-header' className='text-white h-40'>
            {profile && profile?.bgImage ? (
              <Image
                className='object-cover w-full h-64'
                src={profile?.bgImage}
                alt='User Avatar'
                draggable={false}
                width={1024}
                height={1024}
              />
            ) : (
              <Image
                className='object-cover w-full h-64'
                src={'https://i.stack.imgur.com/90nGa.jpg'}
                alt='User Avatar'
                draggable={false}
                width={1024}
                height={1024}
              />
            )}
          </div>
          <div className='flex justify-between items-center p-2'>
            <div className='rounded-full overflow-hidden border-4 border-whie'>
              {profile && profile?.profileImage ? (
                <Image
                  className='object-cover h-32 w-32'
                  src={profile.profileImage}
                  alt='profile Avatar'
                  draggable={false}
                  height={128}
                  width={128}
                />
              ) : (
                <Image
                  className='object-cover h-32 w-32'
                  src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-profile-image-icon-27.png?fit=500%2C500&ssl=1'
                  alt='Default profile Avatar'
                  draggable={false}
                  width={128}
                  height={128}
                />
              )}
            </div>
            <button
              className='text-gray-300 text-sm border-2 mt-24 border-gray-300 p-2 rounded-full font-semibold'
              onClick={handleToggleFollow}
            >
              {user && profile && user._id === profile._id
                ? 'Edit Profile'
                : isFollowing
                ? 'Unfollow'
                : 'Follow'}
            </button>
          </div>
          <div className='mt-4 p-2'>
            <div className='flex items-center text-xl font-bold'>
              {`${profile?.firstName} ${profile?.lastName} `}
              {profile?.isVerified && (
                <div className='ml-1 mt-0.5 text-night-shadz hover:cursor-pointer'>
                  <LuVerified title='Verified Account' size='24px' />
                </div>
              )}
            </div>
            <p className='text-gray-300 text-sm'>@{profile?.username}</p>
            <p className='text-gray-300 mt-2'>{profile?.bio}</p>
            <div className='text-gray-300 mt-2'>
              <div className='flex items-center mb-2'>
                <FontAwesomeIcon icon={faLocationDot} className='text-white' />
                <p className='ml-1.5'>{profile?.location}</p>
                <FontAwesomeIcon icon={faCalendarAlt} className='pl-8 mr-1.5' />
                <p>
                  Joined{' '}
                  {profile?.createdAt
                    ? formatSignupDate(profile.createdAt)
                    : 'Unknown Date'}
                </p>
              </div>
              <div className='flex font-semibold'>
                <p className='font-bold text-white'>
                  {profile?.following.length}
                </p>
                <p className='ml-1 font-normal'>Following</p>
                <p className='font-bold text-white ml-4'>
                  {profile?.followers.length}
                </p>
                <p className='ml-1 font-normal'>Followers</p>
              </div>
            </div>
          </div>
        </div>
        <section id='posts'>
          <div className='flex justify-center items-center overflow-auto'>
            <div className='sm:max-w-xl flex flex-col items-center overflow-auto mb-20 w-full'>
              <div className='w-full overflow-auto'>
                {filteredPosts.map((post) => {
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
                          <div className='max-sm:pr-24 overflow-auto'>
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
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
