import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#094074',
      dark: '#709D47',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#efefef',
      dark: '#cfcfcf  ',
      contrastText: '#000000'
    }
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
