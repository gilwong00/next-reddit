import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/post';

export const getPost = async (page: number) => {
  const { data } = await axios.get(`${BASE_URL}?page=${page}`);
  return data;
};

export const createPost = async (newPost: {
  title: string;
  body: string;
  username: string;
}) => {
  const { data } = await axios.post(BASE_URL, newPost, {
    withCredentials: true
  });
  return data;
};
