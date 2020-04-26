import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth; 

    @media screen and (max-width: 1200px) {
      font-size: 15px
    }

    @media screen and (max-width: 1000px) {
      font-size: 14px
    }

    @media screen and (max-width: 800px) {
      font-size: 13px
    }

    @media screen and (max-width: 600px) {
      font-size: 12px
    }

  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  `