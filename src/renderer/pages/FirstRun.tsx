/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import styles from '@Styles/Initial.module.css';
import { Octokit } from '@octokit/rest';

interface FirstRunProps {
  octokit: Octokit;
}

const FirstRun: React.FC<FirstRunProps> = (props: FirstRunProps) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFetch() {
    setIsLoading(true);
    return props.octokit.users
      .getByUsername({
        username,
      })
      .then((res) => {
        setTimeout(() => {
          window.electron.store.set('initialized', true);
          window.electron.store.set('user', JSON.stringify(res));
          setIsLoading(false);
          window.location.reload();
        }, 3000);
        return true;
      })
      .catch(() => {
        setErrorMessage('Unable to fetch user list');
        setIsLoading(false);
        return false;
      });
  }

  return (
    <div>
      {isLoading ? <div className={styles.loader}>Loading&#8230;</div> : null}

      <main className={styles.main}>
        <div className={styles.helloContainer}>
          <div>
            <h1>Seja Bem Vindo ao HackBox!</h1>
            <p>Insira o seu nome de usuário para burcarmos seus projetos</p>
          </div>
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <p>Usuário:</p>
            <input
              spellCheck={false}
              type="text"
              placeholder="octocat"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              id="gitUser"
            />
            {errorMessage && <div className="error">{errorMessage}</div>}
            <button type="submit" onClick={handleFetch} disabled={isLoading}>
              <p>Proximo</p>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FirstRun;
