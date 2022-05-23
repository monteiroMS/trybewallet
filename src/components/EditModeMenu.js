import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/EditModeMenu.module.css';
import { editExpense } from '../actions';
import { categories, paymentTypes } from '../helpers/options';

class EditModeMenu extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      exchangeRates: {},
    };

    this.updateExpense = this.updateExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { id, expenses } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = expenses[id];
    this.setState({
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });
  }

  updateExpense(event) {
    event.preventDefault();
    const { edit, id } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;
    edit({
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;
    return (
      <form onSubmit={ this.updateExpense } className={ styles.container }>
        <label htmlFor="valor" className={ styles.label }>
          Valor
          <input
            id="valor"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency" className={ styles.label }>
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies.map((currencyName) => (
              <option key={ currencyName }>{ currencyName }</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment" className={ styles.label }>
          Pagamento
          <select
            name="method"
            id="payment"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {paymentTypes.map((payment) => (
              <option key={ payment }>{ payment }</option>
            ))}
          </select>
        </label>
        <label htmlFor="categories" className={ styles.label }>
          Categoria
          <select
            name="tag"
            id="categories"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {categories.map((category) => (
              <option key={ category }>{ category }</option>
            ))}
          </select>
        </label>
        <label htmlFor="description" className={ styles.label }>
          Descrição
          <input
            id="description"
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>
        <button type="submit" className={ styles.btn }>Editar despesa</button>
      </form>
    );
  }
}

EditModeMenu.propTypes = {
  id: PropTypes.number.isRequired,
  edit: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  edit: (payload) => dispatch(editExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModeMenu);
