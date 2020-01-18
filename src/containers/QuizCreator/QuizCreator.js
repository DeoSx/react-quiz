import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {createForm} from '../../form/formFrame';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './QuizCreator.css';

function createFormOptions(number) {
  return createForm(
    {
      label: `Variant ${number}`,
      errorMessage: 'Option must be required',
      id: number
    },
    {required: true}
  );
}

function createFormControls() {
  return {
    question: createForm(
      {
        label: 'Enter the question',
        errorMessage: 'Question must be required'
      },
      {required: true}
    ),
    option1: createFormOptions(1),
    option2: createFormOptions(2),
    option3: createFormOptions(3),
    option4: createFormOptions(4)
  };
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  changeHandler = (value, controlName) => {};

  renderInputs() {
    Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      console.log(control);

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            type='text'
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create Quiz</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}

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
