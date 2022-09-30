// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return { ...state,
      currencies: action.currencies,
    };
  case 'EXPANSES':
    return { ...state,
      expenses: [...state.expenses, {
        ...action.state,
      }],
    };
  case 'UPDATEEXPANSES':
    return { ...state,
      expenses: action.state,
    };
  default:
    return state;
  }
};

export default walletReducer;
