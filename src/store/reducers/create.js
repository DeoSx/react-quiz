import {
  RESET_QUIZ_QUESTION,
  CREATE_QUIZ_QUESTION
} from '../actions/actionTypes';

const initialState = {
  quiz: []
};

export default function createQuiz(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      };
    case RESET_QUIZ_QUESTION:
      return {
        ...state,
        quiz: []
      };
    default:
      return state;
  }
}
