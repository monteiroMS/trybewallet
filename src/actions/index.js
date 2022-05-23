export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const UPDATE_EXCHANGE = 'UPDATE_EXCHANGE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_MODE_ON = 'EDIT_MODE_ON';
export const IS_LOADING = 'IS_LOADING';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  email,
});

export const updateCurrencies = (payload) => ({
  type: UPDATE_CURRENCIES,
  payload,
});

export const updateExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});

export const updateExchange = (payload) => ({
  type: UPDATE_EXCHANGE,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const turnEditModeOn = (payload) => ({
  type: EDIT_MODE_ON,
  payload,
});

export const loading = () => ({
  type: IS_LOADING,
});

export const fetchCurrencies = () => (
  async (dispatch) => {
    dispatch(loading());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
      return dispatch(updateCurrencies(currencies));
    } catch (error) {
      return [error];
    }
  }
);

export const fetchExchange = () => (
  async (dispatch) => {
    dispatch(loading());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      return dispatch(updateExchange(data));
    } catch (error) {
      return [error];
    }
  }
);
