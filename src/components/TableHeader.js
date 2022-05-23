import React, { Component } from 'react';
import styles from '../styles/TableHeader.module.css';
// import PropTypes from 'prop-types';

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr className={ styles.container }>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }
}

// TableHeader.propTypes = {
// prop: PropTypes.type.isRequired,
// };

export default TableHeader;
