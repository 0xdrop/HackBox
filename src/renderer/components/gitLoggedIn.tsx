/* eslint-disable react/destructuring-assignment */
/* eslint-disable promise/always-return */
import styles from '@Styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const { request } = require('@octokit/request');
const { createOAuthDeviceAuth } = require('@octokit/auth-oauth-device');

const MySwal = withReactContent(Swal);

export default function GitLoggedIn() {
  const [token, setToken] = useState<string>('');
  const [useracess, setUserAcess] = useState<string>('');

  useEffect(() => {
    if (window.electron.store.get('useracess')) {
      setUserAcess(JSON.stringify(window.electron.store.get('useracess')));
    } else {
      setUserAcess('');
    }
  }, []);
  useEffect(() => {
    if (token === '') return;
    MySwal.fire({
      icon: 'info',
      title: 'Github Auth',
      text: token,
      didOpen: () => {
        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
        MySwal.showLoading();
      },
    });
  }, [token]);

  async function getAuth() {
    await createOAuthDeviceAuth({
      clientType: 'oauth-app',
      clientId: 'cbba1b848ee1f10b913d',
      scopes: ['repo'],
      request: request.defaults({
        baseUrl: 'https://cors-anywhere.herokuapp.com/https://github.com',
      }),
      onVerification(verification: { verification_uri: any; user_code: any }) {
        setToken(verification.user_code);
        window.electron.ipcRenderer.sendMessage(
          'ipc-openurl',
          verification.verification_uri
        );
      },
    })({
      type: 'oauth',
    }).then(() => {
      setUserAcess(JSON.stringify(window.electron.store.get('useracess')));
      return MySwal.fire({
        title: 'Success!',
        text: 'You are now logged in!',
        confirmButtonText: 'Ok',
      });
    });
  }

  return (
    <div className={styles.container_card}>
      {useracess ? (
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
              return MySwal.fire({
                title: 'Github Auth',
                text: 'Do you want to continue? A new tab will open then please enter the code on this page',
                icon: 'question',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showCancelButton: true,
                preConfirm() {
                  getAuth();
                },
              });
            }}
          >
            Let&apos;s do it
          </button>
        </div>
      )}
    </div>
  );
}
