/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
/* import PropTypes from 'prop-types';
 */
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { StylesProvider, CssBaseline, MuiThemeProvider } from '@material-ui/core';

export const GlobalStyle = createGlobalStyle`
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body {
		align-items: center;
		font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		/*  background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}; */
		/* display: flex;
    flex-direction: column;
    justify-content: center; */
		height: 100vh;
		margin: 0;
		padding: 0;
		transition: all 0.25s linear;
	}
`;

function ThemeWrapper({ children, theme }) {
	console.log('THIS IS THEME INSIDE THEMEWRAPPER', theme);
	return (
		<>
			<ThemeProvider theme={theme}>
				<StylesProvider injectFirst>
					<MuiThemeProvider theme={theme}>
						<GlobalStyle />
						<CssBaseline />
						{children}
					</MuiThemeProvider>
				</StylesProvider>
			</ThemeProvider>
		</>
	);
}
export default ThemeWrapper;
