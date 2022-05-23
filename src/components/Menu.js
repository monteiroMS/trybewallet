import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchange, updateExpenses } from '../actions';
import styles from '../styles/Menu.module.css';
import Loading from './Loading';
import { paymentTypes, categories } from '../helpers/options';
import EditModeMenu from './EditModeMenu';

class Menu extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addExpense(event) {
    event.preventDefault();
    const { value, currency, method, tag, description } = this.state;
    const { dispatch, expenses } = this.props;
    this.setState({
      isLoading: true,
    }, async () => {
      dispatch(fetchExchange());
      dispatch(updateExpenses({
        id: expenses.length,
        value: value === '' ? 0 : value,
        currency,
        method,
        tag,
        description,
      }));
    });
    this.setState({
      isLoading: false,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
      isLoading,
    } = this.state;
    const { currencies, loading, editMode } = this.props;
    if (loading || isLoading) return <Loading />;
    if (editMode.status) {
      return (
        <EditModeMenu
          id={ editMode.id }
          currencies={ currencies }
        />
      );
    }
    return (
      <form onSubmit={ this.addExpense } className={ styles.container }>
        <label htmlFor="valor" className={ styles.label }>
          Valor
          <input
            id="valor"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            placeholder="Quanto foi gasto?"
          />
        </label>
        <label htmlFor="currency" className={ styles.label }>
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
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
            placeholder="Com o que foi gasto?"
          />
        </label>
        <button type="submit" className={ styles.btn }>Adicionar despesa</button>
      </form>
    );
  }
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  editMode: PropTypes.objectOf(PropTypes.any),
};

Menu.defaultProps = {
  loading: false,
  editMode: { status: false, id: 0 },
};

const mapStateToProps = ({ wallet }) => ({
  loading: wallet.loading,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editMode: wallet.editMode,
});

export default connect(mapStateToProps)(Menu);
