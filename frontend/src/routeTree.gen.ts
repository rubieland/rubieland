/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
import { Route as BlogImport } from './routes/blog'
import { Route as BackOfficeImport } from './routes/back-office'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as BlogIndexImport } from './routes/blog/index'
import { Route as BackOfficeIndexImport } from './routes/back-office/index'
import { Route as BackOfficeBlogImport } from './routes/back-office/blog'
import { Route as BackOfficeBlogIndexImport } from './routes/back-office/blog/index'
import { Route as BlogPostsPostIdImport } from './routes/blog/posts/$postId'
import { Route as BackOfficeBlogPostsPostIdImport } from './routes/back-office/blog/posts/$postId'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const BlogRoute = BlogImport.update({
  path: '/blog',
  getParentRoute: () => rootRoute,
} as any)

const BackOfficeRoute = BackOfficeImport.update({
  path: '/back-office',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BlogIndexRoute = BlogIndexImport.update({
  path: '/',
  getParentRoute: () => BlogRoute,
} as any)

const BackOfficeIndexRoute = BackOfficeIndexImport.update({
  path: '/',
  getParentRoute: () => BackOfficeRoute,
} as any)

const BackOfficeBlogRoute = BackOfficeBlogImport.update({
  path: '/blog',
  getParentRoute: () => BackOfficeRoute,
} as any)

const BackOfficeBlogIndexRoute = BackOfficeBlogIndexImport.update({
  path: '/',
  getParentRoute: () => BackOfficeBlogRoute,
} as any)

const BlogPostsPostIdRoute = BlogPostsPostIdImport.update({
  path: '/posts/$postId',
  getParentRoute: () => BlogRoute,
} as any)

const BackOfficeBlogPostsPostIdRoute = BackOfficeBlogPostsPostIdImport.update({
  path: '/posts/$postId',
  getParentRoute: () => BackOfficeBlogRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/back-office': {
      id: '/back-office'
      path: '/back-office'
      fullPath: '/back-office'
      preLoaderRoute: typeof BackOfficeImport
      parentRoute: typeof rootRoute
    }
    '/blog': {
      id: '/blog'
      path: '/blog'
      fullPath: '/blog'
      preLoaderRoute: typeof BlogImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/back-office/blog': {
      id: '/back-office/blog'
      path: '/blog'
      fullPath: '/back-office/blog'
      preLoaderRoute: typeof BackOfficeBlogImport
      parentRoute: typeof BackOfficeImport
    }
    '/back-office/': {
      id: '/back-office/'
      path: '/'
      fullPath: '/back-office/'
      preLoaderRoute: typeof BackOfficeIndexImport
      parentRoute: typeof BackOfficeImport
    }
    '/blog/': {
      id: '/blog/'
      path: '/'
      fullPath: '/blog/'
      preLoaderRoute: typeof BlogIndexImport
      parentRoute: typeof BlogImport
    }
    '/blog/posts/$postId': {
      id: '/blog/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/blog/posts/$postId'
      preLoaderRoute: typeof BlogPostsPostIdImport
      parentRoute: typeof BlogImport
    }
    '/back-office/blog/': {
      id: '/back-office/blog/'
      path: '/'
      fullPath: '/back-office/blog/'
      preLoaderRoute: typeof BackOfficeBlogIndexImport
      parentRoute: typeof BackOfficeBlogImport
    }
    '/back-office/blog/posts/$postId': {
      id: '/back-office/blog/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/back-office/blog/posts/$postId'
      preLoaderRoute: typeof BackOfficeBlogPostsPostIdImport
      parentRoute: typeof BackOfficeBlogImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  AboutRoute,
  BackOfficeRoute: BackOfficeRoute.addChildren({
    BackOfficeBlogRoute: BackOfficeBlogRoute.addChildren({
      BackOfficeBlogIndexRoute,
      BackOfficeBlogPostsPostIdRoute,
    }),
    BackOfficeIndexRoute,
  }),
  BlogRoute: BlogRoute.addChildren({ BlogIndexRoute, BlogPostsPostIdRoute }),
  LoginRoute,
  ProfileRoute,
  RegisterRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/back-office",
        "/blog",
        "/login",
        "/profile",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/back-office": {
      "filePath": "back-office.tsx",
      "children": [
        "/back-office/blog",
        "/back-office/"
      ]
    },
    "/blog": {
      "filePath": "blog.tsx",
      "children": [
        "/blog/",
        "/blog/posts/$postId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/back-office/blog": {
      "filePath": "back-office/blog.tsx",
      "parent": "/back-office",
      "children": [
        "/back-office/blog/",
        "/back-office/blog/posts/$postId"
      ]
    },
    "/back-office/": {
      "filePath": "back-office/index.tsx",
      "parent": "/back-office"
    },
    "/blog/": {
      "filePath": "blog/index.tsx",
      "parent": "/blog"
    },
    "/blog/posts/$postId": {
      "filePath": "blog/posts/$postId.tsx",
      "parent": "/blog"
    },
    "/back-office/blog/": {
      "filePath": "back-office/blog/index.tsx",
      "parent": "/back-office/blog"
    },
    "/back-office/blog/posts/$postId": {
      "filePath": "back-office/blog/posts/$postId.tsx",
      "parent": "/back-office/blog"
    }
  }
}
ROUTE_MANIFEST_END */
