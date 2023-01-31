/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
import styles from '@Styles/Tools.module.css';
import { useRef } from 'react';
import { PluginInterface } from '@Internals/index';

const PluginComponent = (props: { plugin: PluginInterface }) => {
  const { plugin } = props;

  const elementRef = useRef<HTMLSpanElement | any>();

  const toogleMenu = () => {
    switch (elementRef.current.style.display) {
      case 'none':
        elementRef.current.style.display = 'flex';
        break;
      case 'flex':
        elementRef.current.style.display = 'none';
        break;
      default:
        elementRef.current.style.display = 'flex';
        break;
    }
  };

  return (
    <>
      <div className={styles.menu_option}>
        <div className={styles.menu_bar}>
          <span>{plugin.name}</span>
          <span>Version: {plugin.version}</span>
          <span
            onClick={() => toogleMenu()}
            className="material-symbols-outlined"
          >
            expand_more
          </span>
        </div>
        <div ref={elementRef} className={styles.hidden_menu}>
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
    </>
  );
};

export default PluginComponent;
