import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import {createForm, validate, validateForm} from '../../form/formFrame';
import Select from '../../components/UI/Select/Select';
import classes from './QuizCreator.css';
import {
  createQuizQuestion,
  finishQuizQuestion
} from '../../store/actions/create';

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

class QuizCreator extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  state = {
    rightVariantIndex: 1,
    isFormValid: false,
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightVariantIndex: this.state.rightVariantIndex,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    };

    this.props.createQuizQuestion(questionItem);
    console.log(this.props);

    this.setState({
      rightVariantIndex: 1,
      isFormValid: false,
      formControls: createFormControls()
    });
  };

  createQuizHandler = async event => {
    event.preventDefault();

    this.setState({
      rightVariantIndex: 1,
      isFormValid: false,
      formControls: createFormControls()
    });
    this.props.finishQuizQuestion();
  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={index}
          type='text'
          label={control.label}
          value={control.value}
          valid={control.valid}
          shouldValidate={!!control.validation}
          touched={control.touched}
          errorMessage={control.errorMessage}
          onChange={event =>
            this.changeHandler(event.target.value, controlName)
          }
        />
      );
    });
  }

  setRightVariantHandler = event => {
    this.setState({
      rightVariantIndex: +event.target.value
    });
  };

  render() {
    const select = (
      <Select
        label='Choose the answer'
        value={this.state.rightVariantIndex}
        onChange={this.setRightVariantHandler}
        options={[
          {
            text: 'Variant 1',
            value: 1
          },
          {
            text: 'Variant 2',
            value: 2
          },
          {
            text: 'Variant 3',
            value: 3
          },
          {
            text: 'Variant 4',
            value: 4
          }
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create Quiz</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}

            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}>
              Add question
            </Button>
            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}>
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishQuizQuestion: () => dispatch(finishQuizQuestion())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
