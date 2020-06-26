import React from 'react';
import classes from './Loader.css';

const Loader = props => (
  <div className={classes.center}>
    <div>
      <div className={classes.Loader} />
    </div>
  </div>
);

export default Loader;
