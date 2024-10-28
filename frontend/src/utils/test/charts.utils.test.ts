import { groupUsersByMonth } from '../charts.utils';
import { User } from '@/models/user/user.entity';

describe('groupUsersByMonth', () => {
  it('should group users by month and return the correct labels and data', () => {
    const users: User[] = [
      { createdAt: new Date('2023-01-15') } as User,
      { createdAt: new Date('2023-01-20') } as User,
      { createdAt: new Date('2023-02-10') } as User,
      { createdAt: new Date('2023-03-05') } as User,
      { createdAt: new Date('2023-03-25') } as User,
    ];

    const result = groupUsersByMonth(users);

    expect(result).toEqual({
      labels: ['janvier 2023', 'février 2023', 'mars 2023'],
      data: [2, 1, 2],
    });
  });

  it('should return empty labels and data when no users are provided', () => {
    const users: User[] = [];

    const result = groupUsersByMonth(users);

    expect(result).toEqual({
      labels: [],
      data: [],
    });
  });

  it('should handle users created in the same month but different years', () => {
    const users: User[] = [
      { createdAt: new Date('2022-01-15') } as User,
      { createdAt: new Date('2023-01-20') } as User,
    ];

    const result = groupUsersByMonth(users);

    expect(result).toEqual({
      labels: ['janvier 2022', 'janvier 2023'],
      data: [1, 1],
    });
  });

  it('should handle users created in different months and years', () => {
    const users: User[] = [
      { createdAt: new Date('2022-12-15') } as User,
      { createdAt: new Date('2023-01-20') } as User,
      { createdAt: new Date('2023-02-10') } as User,
    ];

    const result = groupUsersByMonth(users);

    expect(result).toEqual({
      labels: ['décembre 2022', 'janvier 2023', 'février 2023'],
      data: [1, 1, 1],
    });
  });
});
