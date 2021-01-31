import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/vote';

export const vote = async (body: {
  value: -1 | 1;
  postId: number;
  username: string;
}) => {
  const { data } = await axios.post(BASE_URL, body, { withCredentials: true });
  return data;
};
