import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import logo from '../images/wallet.png';
import Logo from '../components/Logo';
import validEmail from '../helpers/emailChecker';
import { changeEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      isBtnDisabled: true,
      password: '',
      logged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { email } = this.state;
    const { newEmail } = this.props;
    newEmail(email);
    this.setState({ logged: true });
  }

  handleChange({ target: { name, value } }) {
    const MIN_PASSWORD_LENGTH = 6;
    this.setState({ [name]: value }, () => {
      this.setState(({ email, password }) => ({
        isBtnDisabled:
          validEmail(email) || password.length < MIN_PASSWORD_LENGTH,
      }));
    });
  }

  render() {
    const { email, password, isBtnDisabled, logged } = this.state;
    if (logged) return <Redirect to="/carteira" />;
    return (
      <form
        className={ styles.container }
        onSubmit={ this.onSubmit }
      >
        <img
          src={ logo }
          alt="carteira preta"
          className={ styles.img }
        />
        <Logo />
        <label className={ styles.label } htmlFor="email">
          Insira seu e-mail
          <input
            className={ styles.input }
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label className={ styles.label } htmlFor="password">
          Insira sua senha
          <input
            className={ styles.input }
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          className={ styles.button }
          type="submit"
          disabled={ isBtnDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  newEmail: (email) => dispatch((changeEmail(email))),
});

Login.propTypes = {
  newEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
