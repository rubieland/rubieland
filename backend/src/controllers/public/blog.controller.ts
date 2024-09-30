import { Request, Response, NextFunction } from 'express';
import { PostDocument } from '../../models/types/Post.types';
import Post from '../../models/Post.model';
import i18n from '../../config/i18n';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve all blog posts
    const posts: PostDocument[] = await Post.find({});

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        error: i18n.t('common.error.postsFound_zero', {
          count: 0,
        }),
      });
    }

    const message =
      posts.length === 1
        ? i18n.t('common.success.postsFound_one', { count: 1 })
        : i18n.t('common.success.postsFound_other', {
            count: posts.length,
          });

    res.status(200).json({
      message,
      posts,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const post: PostDocument | null = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        error: i18n.t('common.error.postDoesNotExist'),
      });
    }

    res.status(200).json({
      message: i18n.t('common.success.postsFound_one', { count: 1 }),
      post,
    });
  } catch (error: unknown) {
    next(error);
  }
};
