import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import styles from '../styles/Wallet.module.css';
import Menu from '../components/Menu';
import Expenses from '../components/Expenses';

class Wallet extends React.Component {
  render() {
    return (
      <span className={ styles.container }>
        <Header />
        <Menu />
        <Expenses />
      </span>
    );
  }
}

export default connect()(Wallet);
