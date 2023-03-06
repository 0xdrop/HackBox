import styles from '@Styles/Home.module.css';
import SystemInfo from '@Components/systeminfo';

export default function Dashboard() {
  return (
    <>
      <div className={styles.flexbox}>
        <div className={styles.container_card}>
          <h1>HackBox - Dashboard</h1>
          <hr className={styles.divider} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Donec nulla diam, scelerisque non quam consectetur, tincidunt
            lacinia est. Vestibulum ut nibh dui.
            <br />
            Donec ut leo libero. Aliquam eu odio nulla. Vivamus mollis vel mi in
            scelerisque.
            <br />
            Vivamus sed ex interdum libero finibus bibendum. Donec egestas
            suscipit mauris sit amet volutpat.
            <br />
            Integer mollis pulvinar odio vel gravida. Cras congue dolor metus,
            id maximus sapien faucibus non.
            <br />
            Sed pulvinar mauris purus, eget bibendum dolor faucibus quis.
          </p>
        </div>
      </div>
      <div className={styles.flexbox}>
        <SystemInfo />
      </div>
    </>
  );
}
