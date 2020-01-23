import axios from 'axios';
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes';

const apiKey = 'AIzaSyC1nBpUvJGHWr5RFRDnjvxS4oQiG97E2eQ';

export function auth(email, password, isLogin) {
  return async dispatch => {
    try {
      const authForm = {
        email,
        password,
        returnSecureToken: true
      };

      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

      if (isLogin) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
      }

      const response = await axios.post(url, authForm);
      const data = response.data;

      const expiresInDate = new Date(
        new Date().getTime() + data.expiresIn + 1000
      );

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('localId', data.localId);
      localStorage.setItem('expiresIn', expiresInDate);
      console.log(data);

      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {
      console.log(e);
    }
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
  localStorage.removeItem('expiresIn');
  return {
    type: AUTH_LOGOUT
  };
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  };
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
      console.log('false');
    } else {
      dispatch(authSuccess(token));
      console.log('true');
    }
  };
}
