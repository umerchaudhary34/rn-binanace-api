import axios, {AxiosError, AxiosResponse} from 'axios';

const API_BASE_URL = 'https://discord.com/api/v9';
const CHANNEL_ID = '1290003005604626482';

// Add a request interceptor
axios.interceptors.request.use(async config => {
  const token = process.env.DISCORD_BOT_TOKEN || '';
  config.headers.Authorization = `Bot ${token}`;
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      console.log('You are not authorized to access this resource.');
    }
    return Promise.reject(error);
  },
);

export const getMessages = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/channels/${CHANNEL_ID}/messages`,
  );
  return response.data;
};
