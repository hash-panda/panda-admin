/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_PORT: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_CLAUDE_API_KEY: string;
  readonly VITE_USE_MOCK: string;
  readonly VITE_USE_PWA: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
