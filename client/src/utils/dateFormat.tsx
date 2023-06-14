import { format } from 'date-fns';

export function formatPostDate(date: string): string {
  if (!date) {
    console.error('Invalid date:', date);
    return '';
  }

  const postDate = new Date(date);
  const now = new Date();
  const diffInMinutes = Math.round(
    (now.getTime() - postDate.getTime()) / (1000 * 60)
  );
  const diffInHours = Math.round(diffInMinutes / 60);

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h`;
  } else {
    return format(postDate, 'MMM d');
  }
}

export function formatTitleDate(date: string): string {
  if (!date) {
    console.error('Invalid date:', date);
    return '';
  }

  const postDate = new Date(date);
  const formattedTitleDate = format(postDate, 'hh:mm a · MMMM d yyyy');
  return formattedTitleDate;
}

export function formatSignupDate(date: string): string {
  if (!date) {
    console.error('Invalid date:', date);
    return '';
  }

  const signUpDate = new Date(date);
  const formatSignupDate = format(signUpDate, ' MMM yyyy');
  return formatSignupDate;
}
