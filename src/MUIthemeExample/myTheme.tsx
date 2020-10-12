/* eslint-disable no-unused-vars */

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
	blue, pink, purple, grey,
} from '@material-ui/core/colors';
import useLocalStorageState from '../Hooks/useLocalStorageState';

/*
function myTheme(themeName = 'light') {
 */

/* const themeObject = {

  palette: {
	primary: {
	  light: blue[800],
	  main: blue[500],
	  dark: blue[500],
	},
	secondary: {
	  light: pink[800],
	  main: pink[500],
	  dark: pink[500],
	},

  }
}; */

const lightTheme = {

	palette: {
		primary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		secondary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		type: 'light',
		background: {
			paper: 'linear-gradient(130deg, #96bb7c 80%, #184d47 10%)',

		},
	},
};

const darkTheme = {

	palette: {
		primary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		secondary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		type: 'dark',
		background: {
			paper: 'linear-gradient(130deg, #0c2623 80%, #96bb7c 10%)',
		},
	},
};

const MatchMedia = window.matchMedia
	&& window.matchMedia('(prefers-color-scheme: dark)').matches;
// console.log('MatchMEDIA: THE PREFFERED MODE IS DARK', MatchMedia);

let initialTheme = '';
const preferredTheme = MatchMedia === true ? initialTheme = darkTheme : initialTheme = lightTheme;
console.log('this is the preferredTheme', preferredTheme);

let themeObject = preferredTheme;
console.log('this is the ThemeObject', themeObject);

/* {
  PaletteType === 'light' ? (
	themeObject = lightTheme
  ) : (
	themeObject = darkTheme
  );
}
 */
/* console.log(themeObject); */
/* themeConfig = responsiveFontSizes(themeConfig); */

const useDarkmode = () => {
	const [theme, setTheme] = useState(themeObject);

	console.log('THIS IS INSIDE USEDARKMODE');
	const toggleDarkMode = () => {
		console.log('You called  ToggleDarkMode');
		console.log('THIS IS THEME.TYPE', themeObject);
		const updatedTheme = {
			...themeObject,
			type: themeObject === darkTheme ? themeObject = lightTheme : themeObject = darkTheme,
		};
		setTheme(updatedTheme);
		console.log('THIS IS THEME', theme);
	};
	return [theme, toggleDarkMode];
};

/*    return theme;
	}
	*/
export { themeObject, useDarkmode };
/*

https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes */
