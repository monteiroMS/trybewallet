import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/Line.module.css';
import EditDelete from './EditDelete';

const MIL = 1000;
const isBTCorETH = (currency) => currency === 'BTC' || currency === 'ETH';

class Line extends Component {
  render() {
    const { editMode: { status, id: editId } } = this.props;
    const {
      id,
      description,
      currency,
      tag,
      method,
      value,
      name,
      ask,
    } = this.props;
    const title = name.split('/');
    return (
      <tr className={ status && editId === id ? styles.editing : styles.container }>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ parseFloat(value).toFixed(2) }</td>
        <td>{ title[0] }</td>
        {
          isBTCorETH(currency)
            ? <td>{ (ask * MIL).toFixed(2) }</td>
            : <td>{ Number(ask).toFixed(2) }</td>
        }
        {
          isBTCorETH(currency)
            ? <td>{ ((parseFloat(value) * ask) * MIL).toFixed(2) }</td>
            : <td>{ (parseFloat(value) * ask).toFixed(2) }</td>
        }
        <td>Real</td>
        <EditDelete id={ id } />
      </tr>
    );
  }
}

Line.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired,
  editMode: PropTypes.objectOf(PropTypes.any),
};

Line.defaultProps = {
  editMode: { status: false, id: 0 },
};

const mapStateToProps = ({ wallet: { editMode } }) => ({
  editMode,
});

export default connect(mapStateToProps)(Line);
