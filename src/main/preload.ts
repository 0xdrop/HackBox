/* eslint-disable no-unused-vars */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = string;

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args?: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: any) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  controller: {
    close() {
      ipcRenderer.send('close');
    },
    minimize() {
      ipcRenderer.send('minimize');
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
