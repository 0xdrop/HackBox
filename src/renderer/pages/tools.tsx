/* eslint-disable react/button-has-type */
import styles from '@Styles/Tools.module.css';

export default function Tools() {
  return (
    <>
      <div className={styles.flexbox}>
        <div className={styles.container_card}>
          <h2>Tools</h2>
          <div className={styles.menu}>
            <div className={styles.menu_option}>
              <div className={styles.menu_bar}>
                <span>SqlMap</span>
                <span>Version: {} </span>
              </div>
              <div className={styles.hidden_menu}>
                <button>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">info</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
            <div className={styles.menu_option}>
              <div className={styles.menu_bar}>
                <span>Hydra</span>
                <span>Version: {} </span>
              </div>
              <div className={styles.hidden_menu}>
                <button>
                  <span className="material-symbols-outlined">play_arrow</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">info</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
