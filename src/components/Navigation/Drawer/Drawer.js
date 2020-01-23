import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
  {to: '/', label: 'Tests list', exact: true},
  {to: '/auth', label: 'Auth', exact: true},
  {to: '/quiz-creator', label: 'Create test', exact: false}
];

class Drawer extends Component {
  componentDidMount() {
    console.log(this.props);
    if (this.props.isAuthenticated) {
      console.log('some text');
    }
  }

  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}>
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}

export default Drawer;
