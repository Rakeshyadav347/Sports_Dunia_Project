import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchNews = async (category) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: category, 
        apiKey: API_KEY,
      },
    });
    return response.data.articles; 
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
