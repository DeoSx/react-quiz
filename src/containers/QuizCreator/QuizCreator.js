import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './QuizCreator.css';

export default class QuizCreator extends Component {
  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create Quiz</h1>

          <form onSubmit={this.submitHandler}>
            <input type='text' />
            <hr />
            <input type='text' />
            <input type='text' />
            <input type='text' />
            <input type='text' />

            <select></select>

            <Button type='primary' onClick={this.addQuestionHandler}>
              Add question
            </Button>
            <Button type='success' onClick={this.createQuizHandler}>
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
