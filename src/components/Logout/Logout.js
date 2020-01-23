import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';

class Logout extends Component {
  componentWillMount() {
    console.log(this.props);
    this.props.logout();
  }
  componentDidMount() {
    console.log(this.props);
    this.props.logout();
  }

  render() {
    return (
      <div>
        {/* <Redirect to={'/'} /> */}
        <h1>Block</h1>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
