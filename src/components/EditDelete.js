import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, turnEditModeOn } from '../actions';
import edit from '../images/edit-button.svg';
import styles from '../styles/EditDelete.module.css';
import { DELETE_BUTTON } from '../helpers/options';

class EditDelete extends Component {
  render() {
    const { remove, editModeOn, id } = this.props;
    return (
      <td className={ styles.container }>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => editModeOn(id) }
        >
          <img
            src={ edit }
            alt="lapis preto"
            className={ styles.edit }
          />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => remove(id) }
        >
          <img
            src={ DELETE_BUTTON }
            alt="lata de lixo vermelha"
            className={ styles.delete }
          />
        </button>
      </td>
    );
  }
}

EditDelete.propTypes = {
  remove: PropTypes.func.isRequired,
  editModeOn: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(deleteExpense(id)),
  editModeOn: (id) => dispatch(turnEditModeOn(id)),
});

export default connect(null, mapDispatchToProps)(EditDelete);
