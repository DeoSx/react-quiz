import React, { Component } from 'react'
import classes from './Quiz.css'
import ActvieQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
  state = {
    quizFinished: true,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        questions: 'What color of the sky?',
        rightAnswerId: 4,
        id: 1,
        answers: [
          { text: 'Black', id: 1 },
          { text: 'Green', id: 2 },
          { text: 'Red', id: 3 },
          { text: 'Blue', id: 4 }
        ]
      },
      {
        questions: 'What does the murloc say?',
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: 'Row', id: 1 },
          { text: 'Mrgl mgrl mgrl', id: 2 },
          { text: 'Ga', id: 3 },
          { text: 'Awe awe awe', id: 4 }
        ]
      }
    ]
  }

  onClickAnswerHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }


    const question = this.state.quiz[this.state.activeQuestion]

    if (question.rightAnswerId === answerId) {

      this.setState({
        answerState: { [answerId]: 'success' }
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            quizFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      this.setState({
        answerState: { [answerId]: 'error' }
      })
    }
  }

  isQuizFinished() {
    return this.state.quiz.length === this.state.activeQuestion + 1
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer on all questions</h1>

          {
            this.state.quizFinished
              ? <FinishedQuiz />
              : <ActvieQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                questions={this.state.quiz[this.state.activeQuestion].questions}
                onAnswerClick={this.onClickAnswerHandler}
                questionNumber={this.state.activeQuestion + 1}
                questionsLength={this.state.quiz.length}
                state={this.state.answerState}
              />
          }


        </div>
      </div>
    )
  }
}

export default Quiz;