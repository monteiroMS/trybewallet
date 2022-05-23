import {
  UPDATE_CURRENCIES,
  UPDATE_EXPENSES,
  IS_LOADING,
  UPDATE_EXCHANGE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_MODE_ON,
} from '../actions/index';

const INITIAL_WALLET = {
  loading: false,
  currencies: [],
  expenses: [],
  editMode: {
    status: false,
    id: 0,
  },
};

const wallet = (state = INITIAL_WALLET, action) => {
  switch (action.type) {
  case UPDATE_CURRENCIES:
    return {
      ...state,
      loading: false,
      currencies: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      loading: false,
      expenses: [...state.expenses, action.payload],
    };
  case UPDATE_EXCHANGE:
    return {
      ...state,
      loading: false,
      expenses: state.expenses.map((expense) => {
        const { payload } = action;
        return { ...expense, exchangeRates: payload };
      }),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      loading: false,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      loading: false,
      editMode: { status: false, id: 0 },
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload.id ? action.payload : expense
      )),
    };
  case EDIT_MODE_ON:
    return {
      ...state,
      editMode: { status: true, id: action.payload },
    };
  case IS_LOADING:
    return { ...state, loading: true };
  default:
    return state;
  }
};

export default wallet;
