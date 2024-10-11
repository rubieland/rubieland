import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import { PostDocument, PostData } from '../../models/types/Post.types';
import Post from '../../models/Post.model';
import { DataContext } from '../../validation/types/validation.types';
import { convertStringToBoolean, trimData } from '../../utils/string.utils';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { checkPostData } from '../../validation/Post.validators';
import { fileURLToPath } from 'url';
import path from 'path';
import { deleteFile as deletePicture } from '../../utils/file.utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsPicturesDir = path.join(__dirname, '../../uploads/blog/pictures');
const context: DataContext = DataContext.POST;

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

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const pictureFile = req.file;

  try {
    const { title, content, isPublished } = trimData(req.body);

    const postData: PostData = {
      title,
      content,
      isPublished,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(postData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      if (pictureFile)
        await deletePicture(`${postsPicturesDir}/${pictureFile?.filename}`);
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({
        message: i18n.t('blog.error.postCreationFailed'),
        errors,
      });
    }

    // data validation
    const postDataErrors = await checkPostData(postData);

    if (postDataErrors && postDataErrors.length > 0) {
      if (pictureFile)
        await deletePicture(`${postsPicturesDir}/${pictureFile?.filename}`);
      return res.status(400).json({
        message: i18n.t('blog.error.postCreationFailed'),
        errors: postDataErrors,
      });
    }

    // create new instance of Post with data from req.body
    const newPost = new Post({
      ...postData,
      isPublished: convertStringToBoolean(postData.isPublished),
      picture: pictureFile?.filename,
    });

    // save new blog post in database
    await newPost.save();
    res.status(201).json({
      message: i18n.t('blog.success.postCreationSuccess'),
      newPost,
    });
  } catch (error: unknown) {
    if (pictureFile)
      await deletePicture(`${postsPicturesDir}/${pictureFile?.filename}`);
    if (error instanceof Error) {
      const messages = extractValidationErrorMessagesFromError(error);
      res.status(400).json({ errors: messages });
    } else {
      next(error);
    }
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const pictureFile = req.file;

  try {
    const id = req.params?.id;
    const post: PostDocument | null = await Post.findById(id);
    const { title, content, isPublished } = trimData(req.body);

    if (!post) {
      return res.status(404).json({
        error: i18n.t('common.error.postDoesNotExist'),
      });
    }

    const postData: PostData = {
      title,
      content,
      isPublished,
    };

    // data validation
    const postDataErrors = await checkPostData(postData);

    if (postDataErrors && postDataErrors.length > 0) {
      if (pictureFile)
        await deletePicture(`${postsPicturesDir}/${pictureFile?.filename}`);
      return res.status(400).json({
        message: i18n.t('blog.error.postUpdateFailed'),
        errors: postDataErrors,
      });
    }

    if (pictureFile) {
      if (post.picture) {
        await deletePicture(`${postsPicturesDir}/${post.picture}`).then(
          async () => {
            post.picture = pictureFile?.filename;
          },
        );
      }
      post.picture = pictureFile?.filename;
    }

    (Object.keys(postData) as (keyof PostData)[]).forEach((key) => {
      if (postData[key] !== undefined) {
        (post[key] as keyof PostData) = postData[key] as keyof PostData;
        post.isPublished = convertStringToBoolean(postData.isPublished);
      }
    });

    await post.save();

    res.status(200).json({
      message: i18n.t('blog.success.postUpdateSuccess'),
      post,
    });
  } catch (error: unknown) {
    if (pictureFile)
      await deletePicture(`${postsPicturesDir}/${pictureFile?.filename}`);
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.postDoesNotExist') });
    }

    await post.deleteOne().then(async () => {
      if (post.picture)
        await deletePicture(`${postsPicturesDir}/${post.picture}`);
    });

    res.status(200).json({
      message: i18n.t('blog.success.postDeleteSuccess'),
    });
  } catch (error: unknown) {
    next(error);
  }
};
