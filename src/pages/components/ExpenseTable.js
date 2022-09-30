import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateWalletExpensesStore } from '../../actions';
import { Table, Button } from '../Stile';

class ExpenseTable extends React.Component {
  totalCalc = (expenses) => {
    let counter = 0;
    expenses.forEach((userEntry) => {
      const rate = Object.entries(userEntry.exchangeRates)
        .find((curr) => curr[0] === userEntry.currency);
      counter += (userEntry.value * rate[1].ask);
      return counter;
    });
    return counter;
  }

  removeExpenceFromStore = (expenseId) => {
    console.log(expenseId);
    const { expenses } = this.props;
    const updateExpensesObj = expenses.filter((expense) => expense.id !== expenseId);
    const { updateExpenses } = this.props;
    console.log(updateExpensesObj);
    updateExpenses(updateExpensesObj);
  };

  editExpenceFromStore = (expenseId) => {
    console.log(expenseId);
    const { expenses, putSelectedExpanceInState } = this.props;
    const selectedExpensesObj = expenses.filter((expense) => expense.id === expenseId);
    putSelectedExpanceInState(selectedExpensesObj, expenses);
  };

  render() {
    const { expenses, update } = this.props;
    return (
      <Table>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Tag
          </th>
          <th>
            Método de pagamento
          </th>
          <th>
            Valor
          </th>
          <th>
            Moeda
          </th>
          <th>
            Câmbio utilizado
          </th>
          <th>
            Valor convertido
          </th>
          <th>
            Moeda de conversão
          </th>
          <th>
            Editar/Excluir
          </th>
        </tr>
        { expenses.map((expense) => (
          <tr key={ expense.id }>
            <td>
              { expense.description }
            </td>
            <td>
              { expense.tag }
            </td>
            <td>
              { expense.method }
            </td>
            <td>
              { parseFloat(expense.value).toFixed(2) }
            </td>
            <td>
              { expense.exchangeRates[expense.currency].name }
            </td>
            <td>
              { parseFloat(
                expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td>
              { parseFloat(
                expense.value * expense.exchangeRates[expense.currency].ask,
              ).toFixed(2) }
            </td>
            <td>Real</td>
            <td>
              <Button
                primary
                type="button"
                data-testid="edit-btn"
                onClick={ () => this.editExpenceFromStore(expense.id) }
              >
                Editar
              </Button>
              <Button
                type="button"
                desabled={ !update }
                data-testid="delete-btn"
                onClick={ () => this.removeExpenceFromStore(expense.id) }
              >
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </Table>
    );
  }
}

ExpenseTable.propTypes = {
  update: PropTypes.bool.isRequired,
  expenses: PropTypes.objectOf.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  putSelectedExpanceInState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenses: (expenses) => dispatch(updateWalletExpensesStore(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
