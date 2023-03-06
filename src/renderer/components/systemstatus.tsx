import styles from '@Styles/Home.module.css';
import { useEffect, useState } from 'react';
import { Systeminformation } from 'systeminformation';

function formatBytes(a: number, b = 2) {
  if (!+a) return '0 Bytes';
  const c = b < 0 ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  // eslint-disable-next-line no-restricted-properties
  return `${parseFloat((a / 1024 ** d).toFixed(c))} ${
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  }`;
}

export default function SystemStatus() {
  const [dynamicsysdata, setdynamicsysdata] =
    useState<Systeminformation.DynamicData>();

  window.electron.ipcRenderer.on(
    'ipc-systeminfo-dynamic',
    (args: Systeminformation.DynamicData) => setdynamicsysdata(args)
  );

  useEffect(() => {
    setInterval(() => {
      window.electron.ipcRenderer.sendMessage('ipc-systeminfo-dynamic', []);
    }, 5000);
  }, []);

  return (
    <div>
      {dynamicsysdata ? (
        <div className={styles.container_card}>
          <h2>System Status</h2>
          <hr className={styles.divider} />
          <p>
            {dynamicsysdata.cpuCurrentSpeed.avg} GHz /{' '}
            {dynamicsysdata.cpuCurrentSpeed.max} GHz{' '}
            {dynamicsysdata.cpuTemperature?.main} <br />{' '}
            {formatBytes(dynamicsysdata.mem.used)} /{' '}
            {formatBytes(dynamicsysdata.mem.total)}
          </p>
        </div>
      ) : (
        <div className={styles.container_card}>
          <h2>System Status</h2>
          <hr className={styles.divider} />
          <p>Could Not load System Status</p>
        </div>
      )}
    </div>
  );
}
