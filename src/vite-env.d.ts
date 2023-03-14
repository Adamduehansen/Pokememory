/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSET_URL: string;
  readonly VITE_MAX_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
