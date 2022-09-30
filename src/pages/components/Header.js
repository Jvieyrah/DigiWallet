import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Wallet from '../../img/Wallet.png';

const HeaderConteiner = styled.header`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  background: transparent;
  color: steelblue;
  font-collor: darkblue;
  width: 100%;
  height: 10%;
`;

class Header extends React.Component {
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

  render() {
    const { user, expenses, update } = this.props;
    const { email } = user;

    return (
      <HeaderConteiner className="flex flex-row flex-nowrap" id={ update }>
        <div data-testid="email-field">
          { email }
        </div>
        <img src={ Wallet } alt="Wallet" width="80" height="60" />
        <div>
          Total Debt:
          <spam data-testid="total-field">
            { this.totalCalc(expenses).toFixed(2) }
          </spam>
          <spam data-testid="header-currency-field"> BRL </spam>
        </div>
      </HeaderConteiner>
    );
  }
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  expenses: PropTypes.objectOf.isRequired,
  update: PropTypes.bool.isRequired,
//   wallet: PropTypes.shape({
//     currencies: PropTypes.arrayOf,
//     expenses: PropTypes.arrayOf,
//   }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Header);
