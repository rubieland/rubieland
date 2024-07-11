import { Request, Response, NextFunction } from 'express';
import { BlogArticleDocument } from '../../../models/types/BlogArticle.types';
import BlogArticle from '../../../models/BlogArticle.model';
import i18n from '../../../config/i18n';

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
