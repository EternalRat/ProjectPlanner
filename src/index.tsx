import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';


const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	}
});

ReactDOM.render(
  <React.StrictMode>
		<CookiesProvider>
			<ThemeProvider theme={darkTheme}>
				<BrowserRouter>
					<App></App>
				</BrowserRouter>
			</ThemeProvider>
		</CookiesProvider>
	</React.StrictMode>,
  document.getElementById('root')
);
