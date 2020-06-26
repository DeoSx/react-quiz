import React, {Component} from 'react';
import classes from './Quiz.css';
import ActvieQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import {
  fetchQuizById,
  answerClickHandler,
  retryQuiz
} from '../../store/actions/quiz';

class Quiz extends Component {
  retryHandler = () => {
    this.props.retryQuiz();
    // console.log(this.props);
  };

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
    // console.log(this.props);
    // console.log('Quiz id: ', this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    // console.log(this.props.match.params.id);
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer on all questions</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.quizFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActvieQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              questions={this.props.quiz[this.props.activeQuestion].questions}
              onAnswerClick={this.props.answerClickHandler}
              questionNumber={this.props.activeQuestion + 1}
              questionsLength={this.props.quiz.length}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    quizFinished: state.quiz.quizFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    results: state.quiz.results,
    quiz: state.quiz.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    answerClickHandler: answerId => dispatch(answerClickHandler(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
