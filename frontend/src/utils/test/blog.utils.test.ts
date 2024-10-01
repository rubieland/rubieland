import { checkIsBlogEmpty, filterPublishedPosts } from '../blog.utils';
import { Post } from '../../models/posts/post.entity';

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Post 1',
    content: 'Content 1',
    isPublished: true,
    picture: '',
    createdAt: new Date('2024/09/30'),
    updatedAt: new Date('2024/09/30'),
  },
  {
    id: '2',
    title: 'Post 2',
    content: 'Content 2',
    isPublished: false,
    picture: '',
    createdAt: new Date('2024/09/30'),
    updatedAt: new Date('2024/09/30'),
  },
  {
    id: '3',
    title: 'Post 3',
    content: 'Content 3',
    isPublished: true,
    picture: '',
    createdAt: new Date('2024/09/30'),
    updatedAt: new Date('2024/09/30'),
  },
];

describe('checkIsBlogEmpty', () => {
  it('should return true if posts is undefined', () => {
    expect(checkIsBlogEmpty(undefined)).toBe(true);
  });

  it('should return true if posts is an empty array', () => {
    expect(checkIsBlogEmpty([])).toBe(true);
  });

  it('should return true if no posts are published', () => {
    const unpublishedPosts: Post[] = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
        isPublished: false,
        picture: '',
        createdAt: new Date('2024/09/30'),
        updatedAt: new Date('2024/09/30'),
      },
    ];
    expect(checkIsBlogEmpty(unpublishedPosts)).toBe(true);
  });

  it('should return false if there are published posts', () => {
    expect(checkIsBlogEmpty(mockPosts)).toBe(false);
  });
});

describe('filterPublishedPosts', () => {
  it('should return undefined if posts is undefined', () => {
    expect(filterPublishedPosts(undefined)).toBeUndefined();
  });

  it('should return an empty array if no posts are published', () => {
    const unpublishedPosts: Post[] = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
        isPublished: false,
        picture: '',
        createdAt: new Date('2024/09/30'),
        updatedAt: new Date('2024/09/30'),
      },
    ];
    expect(filterPublishedPosts(unpublishedPosts)).toEqual([]);
  });

  it('should return only the published posts', () => {
    const expectedPublishedPosts: Post[] = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
        isPublished: true,
        picture: '',
        createdAt: new Date('2024/09/30'),
        updatedAt: new Date('2024/09/30'),
      },
      {
        id: '3',
        title: 'Post 3',
        content: 'Content 3',
        isPublished: true,
        picture: '',
        createdAt: new Date('2024/09/30'),
        updatedAt: new Date('2024/09/30'),
      },
    ];

    console.log(mockPosts);
    console.log(filterPublishedPosts(mockPosts));
    console.log('expected published posts ****** ', expectedPublishedPosts);

    expect(filterPublishedPosts(mockPosts)).toEqual(expectedPublishedPosts);
  });
});
