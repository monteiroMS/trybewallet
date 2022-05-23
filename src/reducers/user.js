import { CHANGE_EMAIL } from '../actions/index';

const INITIAL_USER = {
  email: 'test@test.com',
};

const user = (state = INITIAL_USER, action) => {
  switch (action.type) {
  case CHANGE_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
