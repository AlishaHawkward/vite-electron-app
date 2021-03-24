import { ExposedInMainWorld } from '../main/preload';

declare global {
  interface Window {
    electron: ExposedInMainWorld
  }
}
