// import axios from 'axios';
// import dayjs from 'dayjs';

// const baseURL = 'http://localhost:8080';

// let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null;
// let refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('accessToken')) : null;
// let accessTokenExp = localStorage.getItem('refreshTokenExp') ? JSON.parse(localStorage.getItem('accessToken')) : null;
// let refreshTokenExp = localStorage.getItem('refreshTokenExp') ? JSON.parse(localStorage.getItem('accessToken')) : null;

// const axiosInstance = axios.create({
//   baseURL,
//   headers: { Authorization: `Bearer ${accessToken}` },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   if (!authTokens) {
//     authTokens = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null;
//     req.headers.Authorization = `Bearer ${accessToken}`;
//     console.log('interceptor ran');
//   }

//   // 오늘 날짜와 expiration date의 차이가 1보다 작을 경우, 토큰은 만료됨
//   const isExpired = dayjs.unix(accessTokenExp).diff(dayjs()) < 1;
//   console.log('isExpired:', isExpired);

//   if (!isExpired) return req;

//   // when it's expired
//   const response = await axios.post(`${baseURL}/api/token/refresh/`, {
//     refreshToken: refreshToken,
//   });

//   localStorage.setItem('accessToken', JSON.stringify(response.data));
//   req.headers.Authorization = `Bearer ${response.data.accessToken}`;
//   return req;
// });

// export default axiosInstance;
