import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faPoll,
  faSmile,
  faCalendarAlt,
  faMapMarkerAlt,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export const NewPost: React.FC = () => {
  const { user } = useAuth();
  const { createPost } = usePosts(user, false); // Include createPost from usePosts hook.
  const [activeOption, setActiveOption] = useState('For you');
  const [isTyping, setIsTyping] = useState(false);
  const [postContent, setPostContent] = useState(''); // New state for post content

  const handlePostSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createPost(postContent);
    setPostContent('');
    setIsTyping(false);
  };

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Handler for post content change
    setPostContent(event.target.value);
    setIsTyping(event.target.value !== '');
  };

  const handleOptionClick = (option: string) => {
    setActiveOption(option);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className='w-full border-r-2 border-l-2 border-gray-800'>
        <div className='flex items-center justify-evenly text-lg border-b-2 border-gray-800'>
          <button
            className={`${
              activeOption === 'For you'
                ? 'text-night-shadz font-bold '
                : 'text-gray-200  font-bold hover:opacity-70 transition-opacity'
            } focus:outline-none my-4`}
            onClick={() => handleOptionClick('For you')}
          >
            #discovermore
          </button>
          <button
            className={`${
              activeOption === 'Following'
                ? 'text-night-shadz font-bold'
                : 'text-gray-200  font-bold hover:opacity-70 transition-opacity'
            } focus:outline-none`}
            onClick={() => handleOptionClick('Following')}
          >
            #mycon
          </button>
        </div>
        <div className='flex items-start m-4'>
          <div className='flex-shrink-0 mr-4'>
            {user?.profileImage ? (
              <Image
                className='h-12 w-12 rounded-full'
                src={user?.profileImage}
                alt='User Avatar'
                width={48}
                height={48}
                draggable={false}
              />
            ) : (
              <Image
                className='h-12 w-12 rounded-full'
                src='https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg='
                alt='Default User Avatar'
                width={48}
                height={48}
              />
            )}
          </div>
          <div className='flex flex-col flex-grow w-full'>
            <form onSubmit={handlePostSubmit}>
              <textarea
                placeholder="What's happening?"
                value={postContent}
                onChange={handlePostChange}
                className='w-full h-auto text-white text-xl bg-transparent outline-none resize-none mt-2 overflow-hidden'
                maxLength={180}
              ></textarea>
              <div className='flex items-center justify-between mt-4 text-md'>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faImage}
                      className='text-night-shadz hover:opacity-80'
                      title='Add Image'
                    />
                  </div>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faUpload}
                      className='text-night-shadz hover:opacity-80'
                      title='Add GIF'
                    />
                  </div>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faPoll}
                      className='text-night-shadz hover:opacity-80'
                      title='Add Poll'
                    />
                  </div>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faSmile}
                      className='text-night-shadz hover:opacity-80'
                      title='Add Emoji'
                    />
                  </div>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className='text-night-shadz hover:opacity-80'
                      title='Schedule'
                    />
                  </div>
                  <div className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className='text-night-shadz hover:opacity-80'
                      title='Add Location'
                    />
                  </div>
                </div>
                <div className=''>
                  <button
                    type='submit'
                    className={`bg-night-shadz rounded-full  px-4 xxs:px-2 xxs:ml-4 text-white font-semibold hover:opacity-60 transition-opacity ${
                      isTyping ? '' : 'opacity-40'
                    }`}
                    disabled={!isTyping}
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
