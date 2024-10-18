/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BackOfficeImport } from './routes/back-office'
import { Route as AppImport } from './routes/_app'
import { Route as BackOfficeIndexImport } from './routes/back-office/index'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as BackOfficeBlogImport } from './routes/back-office/blog'
import { Route as AppRegisterImport } from './routes/_app/register'
import { Route as AppProfileImport } from './routes/_app/profile'
import { Route as AppLoginImport } from './routes/_app/login'
import { Route as AppBlogImport } from './routes/_app/blog'
import { Route as AppAboutImport } from './routes/_app/about'
import { Route as BackOfficeUsersIndexImport } from './routes/back-office/users/index'
import { Route as BackOfficeBlogIndexImport } from './routes/back-office/blog/index'
import { Route as AppBlogIndexImport } from './routes/_app/blog/index'
import { Route as BackOfficeBlogCreatePostImport } from './routes/back-office/blog/create-post'
import { Route as BackOfficeBlogUpdatePostPostIdImport } from './routes/back-office/blog/update-post.$postId'
import { Route as BackOfficeBlogPostsPostIdImport } from './routes/back-office/blog/posts/$postId'
import { Route as AppBlogPostsPostIdImport } from './routes/_app/blog/posts/$postId'

// Create/Update Routes

const BackOfficeRoute = BackOfficeImport.update({
  path: '/back-office',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const BackOfficeIndexRoute = BackOfficeIndexImport.update({
  path: '/',
  getParentRoute: () => BackOfficeRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const BackOfficeBlogRoute = BackOfficeBlogImport.update({
  path: '/blog',
  getParentRoute: () => BackOfficeRoute,
} as any)

const AppRegisterRoute = AppRegisterImport.update({
  path: '/register',
  getParentRoute: () => AppRoute,
} as any)

const AppProfileRoute = AppProfileImport.update({
  path: '/profile',
  getParentRoute: () => AppRoute,
} as any)

const AppLoginRoute = AppLoginImport.update({
  path: '/login',
  getParentRoute: () => AppRoute,
} as any)

const AppBlogRoute = AppBlogImport.update({
  path: '/blog',
  getParentRoute: () => AppRoute,
} as any)

const AppAboutRoute = AppAboutImport.update({
  path: '/about',
  getParentRoute: () => AppRoute,
} as any)

const BackOfficeUsersIndexRoute = BackOfficeUsersIndexImport.update({
  path: '/users/',
  getParentRoute: () => BackOfficeRoute,
} as any)

const BackOfficeBlogIndexRoute = BackOfficeBlogIndexImport.update({
  path: '/',
  getParentRoute: () => BackOfficeBlogRoute,
} as any)

const AppBlogIndexRoute = AppBlogIndexImport.update({
  path: '/',
  getParentRoute: () => AppBlogRoute,
} as any)

const BackOfficeBlogCreatePostRoute = BackOfficeBlogCreatePostImport.update({
  path: '/create-post',
  getParentRoute: () => BackOfficeBlogRoute,
} as any)

const BackOfficeBlogUpdatePostPostIdRoute =
  BackOfficeBlogUpdatePostPostIdImport.update({
    path: '/update-post/$postId',
    getParentRoute: () => BackOfficeBlogRoute,
  } as any)

const BackOfficeBlogPostsPostIdRoute = BackOfficeBlogPostsPostIdImport.update({
  path: '/posts/$postId',
  getParentRoute: () => BackOfficeBlogRoute,
} as any)

const AppBlogPostsPostIdRoute = AppBlogPostsPostIdImport.update({
  path: '/posts/$postId',
  getParentRoute: () => AppBlogRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/back-office': {
      id: '/back-office'
      path: '/back-office'
      fullPath: '/back-office'
      preLoaderRoute: typeof BackOfficeImport
      parentRoute: typeof rootRoute
    }
    '/_app/about': {
      id: '/_app/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AppAboutImport
      parentRoute: typeof AppImport
    }
    '/_app/blog': {
      id: '/_app/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof AppBlogImport
      parentRoute: typeof AppImport
    }
    '/_app/login': {
      id: '/_app/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AppLoginImport
      parentRoute: typeof AppImport
    }
    '/_app/profile': {
      id: '/_app/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AppProfileImport
      parentRoute: typeof AppImport
    }
    '/_app/register': {
      id: '/_app/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AppRegisterImport
      parentRoute: typeof AppImport
    }
    '/back-office/blog': {
      id: '/back-office/blog'
      path: '/blog'
      fullPath: '/back-office/blog'
      preLoaderRoute: typeof BackOfficeBlogImport
      parentRoute: typeof BackOfficeImport
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/back-office/': {
      id: '/back-office/'
      path: '/'
      fullPath: '/back-office/'
      preLoaderRoute: typeof BackOfficeIndexImport
      parentRoute: typeof BackOfficeImport
    }
    '/back-office/blog/create-post': {
      id: '/back-office/blog/create-post'
      path: '/create-post'
      fullPath: '/back-office/blog/create-post'
      preLoaderRoute: typeof BackOfficeBlogCreatePostImport
      parentRoute: typeof BackOfficeBlogImport
    }
    '/_app/blog/': {
      id: '/_app/blog/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof AppBlogIndexImport
      parentRoute: typeof AppBlogImport
    }
    '/back-office/blog/': {
      id: '/back-office/blog/'
      path: '/'
      fullPath: '/back-office/blog/'
      preLoaderRoute: typeof BackOfficeBlogIndexImport
      parentRoute: typeof BackOfficeBlogImport
    }
    '/back-office/users/': {
      id: '/back-office/users/'
      path: '/users'
      fullPath: '/back-office/users'
      preLoaderRoute: typeof BackOfficeUsersIndexImport
      parentRoute: typeof BackOfficeImport
    }
    '/_app/blog/posts/$postId': {
      id: '/_app/blog/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/blog/posts/$postId'
      preLoaderRoute: typeof AppBlogPostsPostIdImport
      parentRoute: typeof AppBlogImport
    }
    '/back-office/blog/posts/$postId': {
      id: '/back-office/blog/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/back-office/blog/posts/$postId'
      preLoaderRoute: typeof BackOfficeBlogPostsPostIdImport
      parentRoute: typeof BackOfficeBlogImport
    }
    '/back-office/blog/update-post/$postId': {
      id: '/back-office/blog/update-post/$postId'
      path: '/update-post/$postId'
      fullPath: '/back-office/blog/update-post/$postId'
      preLoaderRoute: typeof BackOfficeBlogUpdatePostPostIdImport
      parentRoute: typeof BackOfficeBlogImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AppRoute: AppRoute.addChildren({
    AppAboutRoute,
    AppBlogRoute: AppBlogRoute.addChildren({
      AppBlogIndexRoute,
      AppBlogPostsPostIdRoute,
    }),
    AppLoginRoute,
    AppProfileRoute,
    AppRegisterRoute,
    AppIndexRoute,
  }),
  BackOfficeRoute: BackOfficeRoute.addChildren({
    BackOfficeBlogRoute: BackOfficeBlogRoute.addChildren({
      BackOfficeBlogCreatePostRoute,
      BackOfficeBlogIndexRoute,
      BackOfficeBlogPostsPostIdRoute,
      BackOfficeBlogUpdatePostPostIdRoute,
    }),
    BackOfficeIndexRoute,
    BackOfficeUsersIndexRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/back-office"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/about",
        "/_app/blog",
        "/_app/login",
        "/_app/profile",
        "/_app/register",
        "/_app/"
      ]
    },
    "/back-office": {
      "filePath": "back-office.tsx",
      "children": [
        "/back-office/blog",
        "/back-office/",
        "/back-office/users/"
      ]
    },
    "/_app/about": {
      "filePath": "_app/about.tsx",
      "parent": "/_app"
    },
    "/_app/blog": {
      "filePath": "_app/blog.tsx",
      "parent": "/_app",
      "children": [
        "/_app/blog/",
        "/_app/blog/posts/$postId"
      ]
    },
    "/_app/login": {
      "filePath": "_app/login.tsx",
      "parent": "/_app"
    },
    "/_app/profile": {
      "filePath": "_app/profile.tsx",
      "parent": "/_app"
    },
    "/_app/register": {
      "filePath": "_app/register.tsx",
      "parent": "/_app"
    },
    "/back-office/blog": {
      "filePath": "back-office/blog.tsx",
      "parent": "/back-office",
      "children": [
        "/back-office/blog/create-post",
        "/back-office/blog/",
        "/back-office/blog/posts/$postId",
        "/back-office/blog/update-post/$postId"
      ]
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/back-office/": {
      "filePath": "back-office/index.tsx",
      "parent": "/back-office"
    },
    "/back-office/blog/create-post": {
      "filePath": "back-office/blog/create-post.tsx",
      "parent": "/back-office/blog"
    },
    "/_app/blog/": {
      "filePath": "_app/blog/index.tsx",
      "parent": "/_app/blog"
    },
    "/back-office/blog/": {
      "filePath": "back-office/blog/index.tsx",
      "parent": "/back-office/blog"
    },
    "/back-office/users/": {
      "filePath": "back-office/users/index.tsx",
      "parent": "/back-office"
    },
    "/_app/blog/posts/$postId": {
      "filePath": "_app/blog/posts/$postId.tsx",
      "parent": "/_app/blog"
    },
    "/back-office/blog/posts/$postId": {
      "filePath": "back-office/blog/posts/$postId.tsx",
      "parent": "/back-office/blog"
    },
    "/back-office/blog/update-post/$postId": {
      "filePath": "back-office/blog/update-post.$postId.tsx",
      "parent": "/back-office/blog"
    }
  }
}
ROUTE_MANIFEST_END */
