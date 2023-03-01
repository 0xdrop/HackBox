/* eslint-disable react/button-has-type */
import styles from '@Styles/Home.module.css';
import Dashboard from '@Pages/dashboard';
import Tools from '@Pages/tools';
import FirstRun from '@Pages/FirstRun';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetResponseTypeFromEndpointMethod } from '@octokit/types';
import { Octokit } from '@octokit/rest';

export default function Home() {
  const octokit = new Octokit({ baseUrl: 'https://api.github.com' });
  const [Initial, setInitial] = useState<boolean>(true);
  const [user, setUser] =
    useState<
      GetResponseTypeFromEndpointMethod<typeof octokit.rest.users.getByUsername>
    >();
  useEffect(() => {
    if (!window.electron.store.get('initialized')) {
      setInitial(true);
    } else {
      setUser(JSON.parse(window.electron.store.get('user')));
      setInitial(false);
    }
  }, []);

  return (
    <div>
      {Initial ? (
        <FirstRun octokit={octokit} />
      ) : (
        <Router>
          <main className={styles.main}>
            <div className={styles.menu}>
              <Link to="/" className={styles.icon}>
                <img
                  src={user?.data.avatar_url}
                  alt="Distro Icon"
                  width="64"
                  height="64"
                />
              </Link>
              <hr className={styles.divider} />
              <div className={styles.menu_options}>
                <Link to="/" className={styles.menu_option}>
                  <button>
                    <span className="material-symbols-outlined">home</span>
                  </button>
                </Link>
                <Link to="/tools" className={styles.menu_option}>
                  <button>
                    <span className="material-symbols-outlined">
                      home_repair_service
                    </span>
                  </button>
                </Link>
                <Link className={styles.menu_option} to="/settings">
                  <button>
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className={styles.options_container}>
              <button onClick={window.electron.controller.minimize}>
                <span className="material-symbols-outlined">minimize</span>
              </button>
              <button onClick={window.electron.controller.close}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className={styles.container}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/settings" />
              </Routes>
            </div>
          </main>
        </Router>
      )}
    </div>
  );
}
