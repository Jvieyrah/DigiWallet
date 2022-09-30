import styled, { css } from 'styled-components';

export const Fieldset = styled.fieldset`
  display: flex;
  color: steelblue;
  font-collor: darkblue;
`;

export const Table = styled.table`
  color: steelblue;
  font-collor: darkblue;
`;

export const Button = styled.button`  
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

export const Input = styled.input`
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

export const Select = styled.select`
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
