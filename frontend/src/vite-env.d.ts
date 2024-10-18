/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_BLOG_PICTURES_PATH: string;
  readonly VITE_API_USERS_AVATARS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
