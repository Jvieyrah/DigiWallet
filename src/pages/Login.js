import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router';
import { inputedLoginfo } from '../actions';
import Wallet from '../img/Wallet.png';

const Button = styled.button`  
background: transparent;
border-radius: 3px;
border: 2px solid steelblue;
color: steelblue;
margin: 0 1em;
padding: 0.25em 1em;

${(props) => props.primary && css`
background: steelblue;
color: white;
`}
`;

const Container = styled.div`
  text-align: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid steelblue;
  box-shadow: 20px 7px 7px black
  color: steelblue;
  margin-right: 28%;
  margin-left: 28%;
  margin-top: 10%;
  padding: 2.25em 11 em;
  font-collor: darkblue;
`;

const Input = styled.input`
  text-align: center;
  background: transparent;
  border-radius: 10px;
  border: 2px solid steelblue;
  box-shadow: 20px 7px 7px darkblue
  color: steelblue;
  margin: 0.3rem;
  padding: 0.25em 1em;

  textarea:focus, input:focus {
    color: #ff0000;
}
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      LockButton: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const floor = 6;
      if (email.match(mailformat)
      && password.length >= floor) {
        this.setState({
          LockButton: false,
        });
      } else {
        this.setState({
          LockButton: true,
        });
      }
    });
  };

  sendToStore() {
    const { sendIt, history } = this.props;
    const { email } = this.state;
    sendIt(email);
    history.push('/carteira');
  }

  render() {
    const { LockButton } = this.state;
    return (
      <Container>
        <img src={ Wallet } alt="Wallet" width="100" height="80" />
        <h2>
          Login
        </h2>
        <div htmlFor="emailimput">
          E-mail:
          <Input
            id="emailimput"
            type="email"
            data-testid="email-input"
            name="email"
            onChange={ this.onInputChange }
          />
        </div>
        <div htmlFor="emailpassword">
          Password:
          <Input
            id="emailpassword"
            type="email"
            data-testid="password-input"
            name="password"
            onChange={ this.onInputChange }
          />
        </div>
        <Button
          primary
          type="button"
          disabled={ LockButton }
          onClick={ () => this.sendToStore() }
        >
          Entrar

        </Button>
      </Container>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendIt: (state) => dispatch(inputedLoginfo(state)) });

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendIt: PropTypes.func.isRequired,

};

export default withRouter(connect(null, mapDispatchToProps)(Login));
