import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.css';
import Logo from './Logo';

const userIcon = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';
const MIL = 1000;

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <span className={ styles.container }>
        <Logo />
        <span className={ styles.info }>
          <span className={ styles.user }>
            <img src={ userIcon } alt="icone do usuario" />
            <p data-testid="email-field">{ email }</p>
          </span>
          <span className={ styles.total }>
            <p>Despesas totais:</p>
            <p data-testid="total-field">
              { expenses.reduce((
                acc,
                { currency, value, exchangeRates },
              ) => {
                if (exchangeRates === undefined) {
                  return acc + 0;
                }
                const { code, ask } = exchangeRates[currency];
                if (code === 'BTC' || code === 'ETH') {
                  return acc + (parseFloat(value) * (ask * MIL));
                }
                return acc + (parseFloat(value) * ask);
              }, 0).toFixed(2) }
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </span>
        </span>
      </span>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
