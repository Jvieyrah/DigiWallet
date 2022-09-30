import { currencyFetchRecieve } from '../../actions';

export function fetchCurrencies() {
  console.log('chamou');
  return async (dispatch) => {
    // dispatch(currencyFetchRequest());
    try {
      const url = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const currencies = Object.keys(data).filter((coin) => coin !== 'USDT');
      console.log(currencies);
      dispatch(currencyFetchRecieve(currencies));
    } catch (error) {
      console.log(error);
    }
  };
}

export async function fetcCurrencyRates() {
  console.log('chamou Rates');
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    delete data.USDT;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
