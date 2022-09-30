// Coloque aqui suas actions
export const inputedLoginfo = (state) => ({ type: 'LOGIN', state });

export const currencyFetchRequest = () => ({
  type: 'REQUEST_CURRENCIES' });

export const currencyFetchRecieve = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies });

export const imputedExpansesToWallet = (state) => ({ type: 'EXPANSES', state });

export const updateWalletExpensesStore = (state) => ({ type: 'UPDATEEXPANSES', state });

// export function fetchCurrencies() {
//   return async (dispatch) => {
//     console.log('aooo');
//     dispatch(currencyFetchRequest());
//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       const currencies = Object.keys(data).filter((coin) => coin !== 'USDT');
//       console.log(currencies);
//       dispatch(currencyFetchRecieve(currencies));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
