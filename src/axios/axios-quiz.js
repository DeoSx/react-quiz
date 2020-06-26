import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quizapp-735e0.firebaseio.com/'
});
