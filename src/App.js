import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import Logout from './components/Logout/Logout';
import {autoLogin} from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
    console.log(this.props.isAuthenticated);
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: token => dispatch(autoLogin(token))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
