import {combineReducers} from 'redux';
import quizReducer from '../reducers/quiz';
import createQuiz from './create';

export default combineReducers({
  quiz: quizReducer,
  create: createQuiz
});
