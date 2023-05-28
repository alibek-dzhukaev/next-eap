import axios from 'axios';

const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/';
const local = 'http://localhost:5001/';

const instance = axios.create({
  baseURL: local,
});

export default instance;
