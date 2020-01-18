import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './QuizList.css';
import axios from 'axios';

export default class QuizList extends Component {
  renderQuizes = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>Quiz № {quiz}</NavLink>
        </li>
      );
    });
  };

  componentDidMount() {
    axios
      .get('https://react-quizapp-735e0.firebaseio.com/.json')
      .then(response => console.log(response));
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>QuizList</h1>
          <ul>{this.renderQuizes()}</ul>
        </div>
      </div>
    );
  }
}
