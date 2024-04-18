import axios from 'axios';

axios.interceptors.request.use(
  req => {
    const user = localStorage.getItem('user');
    const token = user && JSON.parse(user).token;
    if (token) {
      req.headers['access_token'] = token;
      console.log('Token worked')
    }
    console.log('Token not worked')
    return req;
  },
  error => {
    console.log('Token very not worked')
    return Promise.reject(error);
  }
);