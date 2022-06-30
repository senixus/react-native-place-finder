import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
});
