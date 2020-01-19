import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_ACTIVE_QUESTION,
  QUIZ_FINISHED
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  quizFinished: false,
  activeQuestion: 0,
  answerState: null,
  results: {},
  quiz: null
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
        error: action.error
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      };
    case QUIZ_FINISHED:
      return {
        ...state,
        quizFinished: true
      };
    case QUIZ_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: action.number,
        answerState: null
      };
    default:
      return state;
  }
}
