import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
  const rightResults = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          return (
            <li key={index}>
              <strong>{index + 1}.</strong> &nbsp;
              {quizItem.questions}
              <i
                className={cls.join(' ')}
              />
            </li>
          )
        })}
      </ul>

      <p>Right {rightResults} of {props.quiz.length}</p>

      <Button onClick={props.onRetry} type="primary">Again</Button>
      <Button type="success">To menu of tests</Button>
    </div>
  )
}

export default FinishedQuiz