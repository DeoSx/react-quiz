import React, { Component } from 'react'
import classes from './Quiz.css'
import ActvieQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
  state = {
    quiz: []
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>

          <ActvieQuiz />
        </div>
      </div>
    )
  }
}

export default Quiz;