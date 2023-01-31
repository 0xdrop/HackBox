import { execSync } from 'child_process';
import { PluginInterface } from '..';

export default {
  name: 'ls',
  binary: '/usr/bin/ls',
  description:
    'List information about the FILEs (the current directory by default). \r\n Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.',
  arguments: ['path', 'options'],
  version_exec: '--version',
  version_func: async (self: PluginInterface): Promise<string> => {
    const result = await execSync(`${self.binary} ${self.version_exec}`);
    return result.toString().split('\n')[0].split('(GNU coreutils)')[1];
  },
};
