import React, { Component } from 'react';
import styles from '../styles/Logo.module.css';
// import PropTypes from 'prop-types';

class Logo extends Component {
  render() {
    return (
      <span className={ styles.container }>
        <h1 className={ styles.first }>trybe</h1>
        <h1 className={ styles.second }>wallet</h1>
      </span>
    );
  }
}

// Logo.propTypes = {
// prop: PropTypes.type.isRequired,
// };

export default Logo;
