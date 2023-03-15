import styles from '@Styles/Home.module.css';
import SystemInfo from '@Components/systeminfo';
import GitLoggedIn from '@Components/gitLoggedIn';

export default function Dashboard() {
  return (
    <>
      <div className={styles.flexbox}>
        <div className={styles.container_card}>
          <h1>HackBox - Dashboard</h1>
          <hr className={styles.divider} />
        </div>
      </div>
      <div className={styles.flexbox}>
        <GitLoggedIn />
        <SystemInfo />
      </div>
    </>
  );
}
