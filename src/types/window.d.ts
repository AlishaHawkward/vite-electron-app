import { ExposedInMainWorld } from '../preload';

declare global {
  interface Window {
    electron: ExposedInMainWorld
  }
}
