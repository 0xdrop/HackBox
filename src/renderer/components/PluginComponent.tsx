/* eslint-disable react/button-has-type */
import styles from '@Styles/Tools.module.css';
import { useEffect, useRef, useState, Component } from 'react';

const PluginComponent = (props) => {
  const { plugin } = props;
  return (
    <>
      <div className={styles.menu_option}>
        <div className={styles.menu_bar}>
          <span>{plugin.name}</span>
          <span>Version: {plugin.version}</span>
          <span className="material-symbols-outlined">expand_more</span>
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
    </>
  );
};

export default PluginComponent;
