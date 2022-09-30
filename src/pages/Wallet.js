import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';
import { fetchCurrencies, fetcCurrencyRates } from './helpers/fetchCurrencies';
import { imputedExpansesToWallet, updateWalletExpensesStore } from '../actions';
import ExpenseTable from './components/ExpenseTable';
import { Fieldset, Button, Input, Select } from './Stile';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      LockButton: true,
      onEdit: false,
      exchangeRates: {},
    };
  }

  // enviando a action fetchCurrencies no loading
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  addImputToStateOnChange = ({ target }) => {
    const key = target.id;
    const newValue = target.value;
    this.setState(
      {
        [key]: newValue,
      },
      () => {
        const { value, description } = this.state;
        const minimumAccepted = 0;
        if (value > minimumAccepted && description.length > 1) {
          this.setState({
            LockButton: false,
          });
        } else {
          this.setState({
            LockButton: true,
          });
        }
      },
    );
  };

  addExpenceToStore = async () => {
    const rates = await fetcCurrencyRates();
    this.setState({
      exchangeRates: rates,
    });
    const expense = this.state;
    delete expense.LockButton;
    delete expense.onEdit;

    const { sendItToWalletExpensesStore } = this.props;
    sendItToWalletExpensesStore(expense);
    const { id } = this.state;
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      LockButton: true,
    });
  };

  putSelectedExpanceInState = (expanse, allexpenses) => {
    console.log(expanse);
    const {
      id,
      value,
      currency,
      description,
      method,
      tag,
      exchangeRates,
    } = expanse[0];
    this.setState({
      id,
      value,
      currency,
      description,
      method,
      tag,
      LockButton: false,
      onEdit: true,
      exchangeRates,
      registeredSpence: allexpenses,
    });
  };

  updateExpenceToStore = () => {
    const { registeredSpence } = this.state;
    const expense = this.state;
    const { id } = this.state;
    delete expense.LockButton;
    delete expense.onEdit;
    delete expense.registeredSpence;
    registeredSpence[id] = expense;
    console.log(registeredSpence);
    const { sendItUpdatedExpensesToStore } = this.props;
    sendItUpdatedExpensesToStore(registeredSpence);
    this.setState({
      value: 0,
      description: '',
      LockButton: true,
    });
  };

  render() {
    const { currencies } = this.props;
    const { LockButton,
      onEdit,
      currency,
      method,
      value,
      description,
      tag,
      exchangeRates } = this.state;

    return (
      <div>
        <Header update={ LockButton } />
        <Fieldset id="formulário para adicionar uma despesa">
          <div htmlFor="value">
            Value:
            <Input
              id="value"
              type="number"
              data-testid="value-input"
              placeholder="Insert value here"
              value={ value }
              onChange={ this.addImputToStateOnChange }
            />
          </div>
          <div htmlFor="currency">
            Moeda:
            <Select
              id="currency"
              placeholder={ currency }
              data-testid="currency-input"
              onChange={ this.addImputToStateOnChange }
            >
              {currencies.map((coin, index) => (
                <option key={ index }>{coin}</option>
              ))}
            </Select>
          </div>
          <div htmlFor="description">
            Description:
            <Input
              id="description"
              type="text"
              value={ description }
              data-testid="description-input"
              placeholder="Insert description"
              onChange={ this.addImputToStateOnChange }
            />
          </div>
          <div htmlFor="method">
            Forma de pagamento:
            <Select
              id="method"
              data-testid="method-input"
              placeholder={ method }
              onChange={ this.addImputToStateOnChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </Select>
          </div>
          <div htmlFor="tag">
            Finalidade:
            <Select
              id="tag"
              data-testid="tag-input"
              placeholder={ tag }
              onChange={ this.addImputToStateOnChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </Select>
          </div>
          { onEdit ? (
            <Button
              primary
              type="button"
              disabled={ LockButton }
              onClick={ () => this.updateExpenceToStore() }
            >
              Editar despesa
            </Button>
          ) : (
            <Button
              type="button"
              disabled={ LockButton }
              onClick={ () => this.addExpenceToStore() }
            >
              Adicionar despesa
            </Button>)}
        </Fieldset>
        <ExpenseTable
          putSelectedExpanceInState={ this.putSelectedExpanceInState }
          update={ LockButton }
        />
        <p
          id={ exchangeRates }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  sendItToWalletExpensesStore: PropTypes.func.isRequired,
  sendItUpdatedExpensesToStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  sendItToWalletExpensesStore: (state) => dispatch(imputedExpansesToWallet(state)),
  sendItUpdatedExpensesToStore: (state) => dispatch(updateWalletExpensesStore(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
