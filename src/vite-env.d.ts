/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSET_URL: string;
  readonly VITE_MAX_ID: string;
  readonly VITE_WS_URL: string;
  readonly VITE_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
