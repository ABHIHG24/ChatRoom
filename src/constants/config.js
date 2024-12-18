// export const server = import.meta.env.VITE_CHATROOM_SERVER;

export const server= "http://localhost:3000";

import axios from "axios";

const CustomFetch = axios.create({
  baseURL: `${server}/api/v1`,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});
// console.log("Request Headers:", CustomFetch.defaults.headers);

export { CustomFetch };
