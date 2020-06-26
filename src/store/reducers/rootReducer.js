import {combineReducers} from 'redux';
import quizReducer from '../reducers/quiz';
import createQuiz from './create';
import authQuiz from './auth';

export default combineReducers({
  quiz: quizReducer,
  create: createQuiz,
  auth: authQuiz
});
