/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_ENV?: 'development' | 'production'
  readonly REACT_APP_CRASHBOT_API_KEY?: string
  readonly REACT_APP_LIST_URL?: string
  readonly REACT_APP_SEGMENT_KEY?: string
}
