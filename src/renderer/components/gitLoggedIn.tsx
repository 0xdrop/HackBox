import styles from '@Styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

// const { request } = require('@octokit/request');
// const { createOAuthDeviceAuth } = require('@octokit/auth-oauth-device');

export default function GitLoggedIn() {
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  // const [useracess, setUserAcess] = useState<string>('');

  useEffect(() => {
    if (!window.electron.store.get('loggedIn')) {
      setloggedIn(false);
    } else {
      setloggedIn(true);
    }
  }, []);

  async function getAuth() {
    // const auth = createOAuthDeviceAuth({
    //   clientType: 'oauth-app',
    //   clientId: 'cbba1b848ee1f10b913d',
    //   scopes: ['repo'],
    //   request: request.defaults({
    //     baseUrl: 'https://cors-anywhere.herokuapp.com/https://github.com',
    //   }),
    //   onVerification(verification: { verification_uri: any; user_code: any }) {
    //     console.log('Open %s', verification.verification_uri);
    //     console.log('Enter code: %s', verification.user_code);
    //   },
    // });
    // const tokenAuthentication = await auth({
    //   type: 'oauth',
    // });
    // console.log(tokenAuthentication);
  }

  return (
    <>
      <ReactModal className={styles.modal_root} isOpen={modal}>
        <div className={styles.modal_main}>
          <p>A</p>
        </div>
      </ReactModal>
      <div className={styles.container_card}>
        {loggedIn ? (
          <div>
            <div>Rights permited</div>
            <div>Logoff?</div>
          </div>
        ) : (
          <div>
            <h3>
              To have access for your private repositories <br />
              you need to login!
            </h3>
            <button
              type="button"
              onClick={() => {
                setModal(!modal);
              }}
            >
              Let&apos;s do it
            </button>
          </div>
        )}
      </div>
    </>
  );
}
