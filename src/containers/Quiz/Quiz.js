import React, {Component} from 'react';
import classes from './Quiz.css';
import ActvieQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

class Quiz extends Component {
  state = {
    loading: true,
    quizFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
    quiz: []
  };

  onClickAnswerHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const results = this.state.results;
    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightVariantIndex === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            quizFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.quiz.length === this.state.activeQuestion + 1;
  }

  retryHandler = () => {
    this.setState({
      quizFinished: false,
      answerState: null,
      activeQuestion: 0,
      results: {}
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      );
      const quiz = response.data;
      this.setState({
        quiz,
        loading: false
      });
      console.log(quiz);
    } catch (e) {
      console.log(e);
    }
    console.log('Quiz id: ', this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer on all questions</h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.quizFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActvieQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              questions={this.state.quiz[this.state.activeQuestion].questions}
              onAnswerClick={this.onClickAnswerHandler}
              questionNumber={this.state.activeQuestion + 1}
              questionsLength={this.state.quiz.length}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
