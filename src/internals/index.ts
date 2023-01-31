/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import electron from 'electron';
import fs from 'fs';

export interface StructPlugins {
  structure: [
    {
      name: string;
      binary: string;
      description: string;
      arguments: Array<string>;
      version: string;
    }
  ];
}

const Internals = {
  electron: {
    Electron: electron.app,
    ElectronWin: electron.BrowserWindow,
  },

  async getVersion(plugin) {
    // Spawn process and checks for version
    const result = await plugin.version_func(plugin);
    plugin.version = result;
    delete plugin.version_func;
    return plugin;
  },

  async listPlugins() {
    const files = await fs.readdirSync('src/internals/plugins/');
    return files.map((el) => {
      return require(`./plugins/${el}`);
    });
  },

  declareEvents() {},
};

electron.ipcMain.on('Internals-GetPlugins', async (event) => {
  const plugins = await Internals.listPlugins();
  const versions = await Promise.all(
    await plugins.map((element) => {
      return Internals.getVersion(element.default);
    })
  );
  return event.reply('Internals-SetPlugins', versions);
});

export default Internals;
