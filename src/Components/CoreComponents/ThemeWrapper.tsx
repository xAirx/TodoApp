/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
/* import PropTypes from 'prop-types';
 */
import { createGlobalStyle } from 'styled-components';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

export const GlobalStyle = createGlobalStyle`
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body {
		align-items: center;
		font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto,
			Helvetica, Arial, sans-serif;
		height: 100vh;
		margin: 0;
		padding: 0;
		transition: all 0.25s linear;
	}
`;

interface Ithemewrapper {
	children: any
	theme: Object
}
export const ThemeWrapper: React.FC<Ithemewrapper> = ({ children, theme }) => (
	<>
		<MuiThemeProvider theme={theme}>
			<GlobalStyle />
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	</>
);
