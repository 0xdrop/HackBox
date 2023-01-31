/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import electron, { IpcMainEvent } from 'electron';
import fs from 'fs';

export interface PluginInterface {
  name: string;
  binary: string;
  description: string;
  arguments: [string];
  version_exec: string;
  version_func: (self: PluginInterface) => string;
  version?: string;
  //  async (self: this): string => {
  //   const result = await execSync(`${self.binary} ${self.version_exec}`);
  //   return result.toString();
  // },
}

export interface InternalsInterface {
  getVersion: (plugin: PluginInterface) => Promise<PluginInterface>;
  listPlugins: () => Promise<Array<{ default: PluginInterface }>>;
  declareEvent: (
    event: string,
    callback: (data: IpcMainEvent, args: any[]) => any
  ) => void;
}

const Internals: InternalsInterface = {
  async getVersion(plugin) {
    // Spawn process and checks for version
    const result = await plugin.version_func(plugin);
    plugin.version = result;
    return plugin;
  },

  async listPlugins() {
    const files = fs.readdirSync('src/internals/plugins/');
    return files.map((el) => {
      return require(`./plugins/${el}`);
    });
  },

  declareEvent(event, callback) {
    electron.ipcMain.on(event, async (data: IpcMainEvent, args: any[]) =>
      callback(data, args)
    );
  },
};

electron.ipcMain.on('Internals-GetPlugins', async (event) => {
  const plugins = await Internals.listPlugins();
  const versions = await Promise.all(
    await plugins.map((element) => {
      return Internals.getVersion(element.default);
    })
  );
  console.log('INTERNALS', versions);
  event.reply('Internals-SetPlugins', JSON.stringify(versions));
});

export default Internals;
