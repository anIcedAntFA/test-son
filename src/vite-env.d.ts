/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_DEV_BASE_URL: string;
  readonly VITE_APP_SERVER_BASE_URL: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}