import firebase from '@firebase/app';
import '@firebase/storage';

import { FETCH_BANNER } from './types';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const storage = firebase.storage();

export const fetchBanner = () => dispatch => {
  storage
    .ref(`/banner.png`)
    .getDownloadURL()
    .then(url =>
      dispatch({
        type: FETCH_BANNER,
        payload: url,
      })
    )
    .catch(err => {
      console.error('Failed to load banner image');
    });
};
