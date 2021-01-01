import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/user';

export const authUser = async (body: {
  usernameOrEmail: string;
  password: string;
}) => {
  const { data } = await axios.post(`${BASE_URL}/login`, body);
  return data;
};

export const register = async (body: {
  username: string;
  email: string;
  password: string;
}) => {
  const { data } = await axios.post(`${BASE_URL}/register`, body);
  return data;
};

export const whoami = async () => {
  const { data } = await axios.get(`${BASE_URL}/whoami`);
  return data;
};
