import { User } from '@/models/user/user.entity';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * group users by month and return the number of users created each month
 * @param users list of users
 * @returns object containing labels (months) and data (number of users created each month)
 */
export const groupUsersByMonth = (users: User[]) => {
  const userCounts: { [key: string]: number } = {};

  // format createdAt date to yyyy-MM format (e.g. 2024-01)
  users.forEach((user) => {
    const monthYear = format(user.createdAt, 'yyyy-MM');
    userCounts[monthYear] = (userCounts[monthYear] || 0) + 1;
  });

  // sort months in ascending order
  const sortedKeys = Object.keys(userCounts).sort((a, b) => {
    const dateA = parse(a, 'yyyy-MM', new Date());
    const dateB = parse(b, 'yyyy-MM', new Date());
    return dateA.getTime() - dateB.getTime();
  });

  // format months in MMMM yyyy format (e.g. January 2024)
  const labels = sortedKeys.map((key) =>
    format(parse(key, 'yyyy-MM', new Date()), 'MMMM yyyy', { locale: fr }),
  );
  const data = sortedKeys.map((key) => userCounts[key]);

  return { labels, data };
};
