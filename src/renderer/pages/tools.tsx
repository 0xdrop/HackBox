/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import styles from '@Styles/Tools.module.css';
import { useEffect, useState } from 'react';
import { PluginInterface } from '@Internals/index';
import PluginComponent from '@Components/PluginComponent';

export default function Tools() {
  const [plugins, setPlugins] = useState<Array<PluginInterface>>([{}]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('Internals-GetPlugins', []);
    window.electron.ipcRenderer.on('Internals-SetPlugins', (args) => {
      setPlugins(JSON.parse(args));
    });
  }, []);

  return (
    <>
      <div className={styles.flexbox}>
        <div className={styles.container_card}>
          <h2>Tools</h2>
          <div className={styles.menu}>
            {plugins ? (
              plugins.map((el) => {
                return <PluginComponent plugin={el} />;
              })
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
