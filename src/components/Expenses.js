import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Line from './Line';
import TableHeader from './TableHeader';
import styles from '../styles/Expenses.module.css';
import Loading from './Loading';

class Expenses extends Component {
  render() {
    const { expenses } = this.props;
    if (!expenses.length) {
      return (
        <span className={ styles.noExpenses }>
          <h1>Você ainda não adicionou nenhuma despesa.</h1>
          <p>Preencha os campos acima e clique no botão para adicionar uma despesa</p>
        </span>
      );
    }
    return (
      <table className={ styles.container }>
        <TableHeader />
        <tbody className={ styles.body }>
          {
            expenses.map(({
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
            }) => {
              if (exchangeRates === undefined) {
                return <tr key={ `tr${id}` }><td><Loading /></td></tr>;
              }
              const { name, ask } = exchangeRates[currency];
              return (
                <Line
                  key={ id }
                  id={ id }
                  description={ description }
                  currency={ currency }
                  tag={ tag }
                  method={ method }
                  value={ value }
                  name={ name }
                  ask={ ask }
                />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Expenses);
