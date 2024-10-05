import { Post } from '../models/posts/post.entity';

/**
 * checks if the list of posts is empty
 * @param posts  the list of posts to check if it is empty
 * @returns boolean  returns true if posts is undefined or if the list of posts is empty, otherwise false
 */
export const checkIsBlogEmpty = (posts: Post[] | undefined): boolean => {
  return !posts || posts.length === 0;
};

/**
 *  filters the list of posts to only include the published posts
 * @param posts the list of posts to filter
 * @returns Post[] | undefined  returns the list of published posts
 * */
export const filterPublishedPosts = (
  posts: Post[] | undefined,
): Post[] | undefined => {
  return posts?.filter((a) => a.isPublished);
};
