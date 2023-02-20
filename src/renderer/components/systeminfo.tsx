import styles from '@Styles/Home.module.css';
import { useEffect, useState } from 'react';
import { Systeminformation } from 'systeminformation';

export default function SystemInfo() {
  const [sysdata, setsysdata] = useState<Systeminformation.StaticData>();

  window.electron.ipcRenderer.on(
    'ipc-systeminfo',
    (args: Systeminformation.StaticData) => setsysdata(args)
  );

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('ipc-systeminfo', []);
  }, []);

  return (
    <div>
      {sysdata ? (
        <div className={styles.container_card}>
          <h2>System Info</h2>
          <hr className={styles.divider} />
          <p>
            {sysdata.os.distro} {sysdata.os.release} {sysdata.os.arch}{' '}
            {sysdata.os.kernel}
            <br /> {sysdata.cpu.manufacturer} {sysdata.cpu.brand}{' '}
            {sysdata.cpu.cores} Cores @{sysdata.cpu.speed} GHz
            <br /> {sysdata.net[0].ifaceName}/{sysdata.net[0].ip4}{' '}
            {sysdata.net[1].ifaceName}/{sysdata.net[1].ip4}
          </p>
        </div>
      ) : (
        <div className={styles.container_card}>
          <h2>System Info</h2>
          <hr className={styles.divider} />
          <p>Could Not load System Info</p>
        </div>
      )}
    </div>
  );
}
