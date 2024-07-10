import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import {
  BlogArticleDocument,
  BlogArticleData,
} from '../../models/types/BlogArticle.types';
import BlogArticle from '../../models/BlogArticle.model';
import { DataContext } from '../../validation/types/validation.types';
import { convertStringToBoolean, trimData } from '../../utils/string.utils';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { checkBlogArticleData } from '../../validation/BlogArticle.validators';

const context: DataContext = DataContext.BLOG_ARTICLE;

export const getAllBlogArticles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve all blog articles
    const articles: BlogArticleDocument[] = await BlogArticle.find({});

    if (!articles || articles.length === 0) {
      return res.status(404).json({
        error: i18n.t('common.error.blogArticleFound_zero', {
          count: 0,
        }),
      });
    }

    const message =
      articles.length === 1
        ? i18n.t('common.success.blogArticleFound_one', { count: 1 })
        : i18n.t('common.success.blogArticleFound_other', {
            count: articles.length,
          });

    res.status(200).json({
      message,
      articles,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getBlogArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params?.id;
    const article: BlogArticleDocument | null = await BlogArticle.findById(id);

    if (!article) {
      return res.status(404).json({
        error: i18n.t('common.error.blogArticleDoesNotExist'),
      });
    }

    res.status(200).json({
      message: i18n.t('common.success.blogArticleFound_one', { count: 1 }),
      article,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const createBlogArticle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content, isPublished } = trimData(req.body);

    // TODO: add picture logic

    const blogArticleData: BlogArticleData = {
      title,
      content,
      isPublished,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(blogArticleData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({
        message: i18n.t('blog.error.blogArticleCreationFailed'),
        errors,
      });
    }

    // data validation
    const blogArticleDataErrors = await checkBlogArticleData(blogArticleData);

    if (blogArticleDataErrors && blogArticleDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('blog.error.blogArticleCreationFailed'),
        errors: blogArticleDataErrors,
      });
    }

    // create new instance of BlogArticle with data from req.body
    const newBlogArticle = new BlogArticle({
      ...blogArticleData,
      isPublished: convertStringToBoolean(blogArticleData.isPublished),
    });

    // save new blog article in database
    await newBlogArticle.save();
    res.status(201).json({
      message: i18n.t('blog.success.blogArticleCreationSuccess'),
      newBlogArticle,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const messages = extractValidationErrorMessagesFromError(error);
      res.status(400).json({ errors: messages });
    } else {
      next(error);
    }
  }
};
