import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    /* font-size: 10px;  10/16=0.625*100=62.5%;  16px is usual browser default */
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body {
    line-height: 1;
    font-weight: 400;
    color: #495057;
  }
`;

export default GlobalStyle;