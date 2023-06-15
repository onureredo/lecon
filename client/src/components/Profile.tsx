// import { useRouter } from 'next/router';
// import { InfinitySpin } from 'react-loader-spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { LuVerified } from 'react-icons/lu';
// import { useAuth } from '@/context/AuthContext';
// import { usePosts } from '@/hooks/usePosts';
// import { formatSignupDate } from '@/utils/dateFormat';
// import Image from 'next/image';
// import {
//   faCalendarAlt,
//   faLocationDot,
// } from '@fortawesome/free-solid-svg-icons';

// const ProfilePage = () => {
//   const router = useRouter();
//   const { posts } = usePosts();
//   const { user } = useAuth();
//   console.log(user);

//   if (!user) {
//     return (
//       <div className='w-full min-h-screen flex items-center justify-center'>
//         <InfinitySpin width='148' color='#bb3855' />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className='border-2 border-gray-800'>
//         <div className='flex flex-col justify-between items-start px-2 py-1'>
//           <div className='w-full bg-rouge bg-opacity-50 backdrop-blur-sm text-2xl font-bold text-white'>
//             {`${user.firstName} ${user.lastName}`}
//           </div>
//           <div className='text-md ml-0.5 text-gray-300'>
//             {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
//           </div>
//         </div>
//         <div className='text-white'>
//           <div id='profile-header' className='text-white h-40'>
//             <Image
//               className='object-cover w-full h-64'
//               src={user.bgImage}
//               width={1500}
//               height={1500}
//               alt='user background Image'
//             />
//           </div>
//           <div className='flex justify-between items-center p-2'>
//             <div className='rounded-full overflow-hidden border-4 border-whie'>
//               {user && user.profileImage ? (
//                 <Image
//                   className='object-cover h-32 w-32'
//                   src={user.profileImage}
//                   alt='User Avatar'
//                   draggable={false}
//                   height={128}
//                   width={128}
//                 />
//               ) : (
//                 <Image
//                   className='object-cover h-32 w-32'
//                   src='https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1'
//                   alt='Default User Avatar'
//                   draggable={false}
//                   width={128}
//                   height={128}
//                 />
//               )}
//             </div>
//             <button className='text-gray-300 text-sm border-2 mt-24 border-gray-300 p-2 rounded-full font-semibold'>
//               Edit Profile
//             </button>
//           </div>
//           <div className='mt-4 p-2'>
//             <div className='flex items-center text-xl font-bold'>
//               {`${user.firstName} ${user.lastName} `}
//               {user.isVerified && (
//                 <div className='ml-1 mt-0.5 text-night-shadz hover:cursor-pointer'>
//                   <LuVerified title='Verified Account' size='24px' />
//                 </div>
//               )}
//             </div>
//             <p className='text-gray-300 text-sm'>@{user.username}</p>
//             <p className='text-gray-300 mt-2'>{user.bio}</p>
//             <div className='text-gray-300 mt-2'>
//               <div className='flex items-center mb-2'>
//                 <FontAwesomeIcon icon={faLocationDot} className='text-white' />
//                 <p className='ml-1.5'>{user.location}</p>
//                 <FontAwesomeIcon icon={faCalendarAlt} className='pl-8 mr-1.5' />
//                 <p>Joined {formatSignupDate(user.createdAt)}</p>
//               </div>
//               <div className='flex font-semibold'>
//                 <p className='font-bold text-white'>{user.following.length}</p>
//                 <p className='ml-1 font-normal'>Following</p>
//                 <p className='font-bold text-white ml-4'>
//                   {user.followers.length}
//                 </p>
//                 <p className='ml-1 font-normal'>Followers</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <section id='posts'>{}</section>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;
