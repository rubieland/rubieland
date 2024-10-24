export enum QueryKeysEnum {
  USERS = 'users',
  MY_PROFILE = 'myProfile',
  POSTS = 'posts',
  POST_DETAILS = 'postDetails',
}

export const GET_POST_KEY = (id: string) => [
  QueryKeysEnum.POST_DETAILS,
  { postId: id },
];
