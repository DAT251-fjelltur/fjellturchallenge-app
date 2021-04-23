import styled, { css } from 'styled-components/native'

export const Button = styled.Button`
/* This renders the buttons above... Edit me! */
display: inline-block;
border-radius: 8px;
padding: 0.5rem 0;
margin: 0.5rem 1rem;
width: 11rem;
background: #FFDE9D;
color: black;
border: 0px;

/* The GitHub button is a primary button
 * edit this to target it specifically! */
${props => props.primary && css`
  color: black;
  width: 6rem;
`}
`