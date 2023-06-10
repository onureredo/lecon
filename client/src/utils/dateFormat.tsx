import { format } from 'date-fns';

export function formatTweetDate(date: string): string {
  const tweetDate = new Date(date);
  const now = new Date();
  const diffInMinutes = Math.round(
    (now.getTime() - tweetDate.getTime()) / (1000 * 60)
  );
  const diffInHours = Math.round(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return format(tweetDate, 'MMM d');
  }
}

export function formatTitleDate(date: string): string {
  const postDate = new Date(date);
  const formattedTitleDate = format(postDate, 'hh:mm a · MMMM d yyyy');
  return formattedTitleDate;
}

export function formatSignupDate(date: string): string {
  const signUpDate = new Date(date);
  const formatSignupDate = format(signUpDate, ' MMM yyyy');
  return formatSignupDate;
}
