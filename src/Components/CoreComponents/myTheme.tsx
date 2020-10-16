/* eslint-disable no-unused-vars */

import { useState } from 'react';

export const lightTheme = {

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

export const darkTheme = {

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

export const useDarkmode = (themeObject: any) => {
	console.log('We are inside usedarkmode', themeObject);

	const [theme, setTheme] = useState(themeObject);
	console.log('this is the set theme inside useDarkmode', theme);
	/* console.log('THIS IS INSIDE USEDARKMODE'); */
	const toggleDarkMode = () => {
		/* console.log('You called  ToggleDarkMode');
		console.log('THIS IS THEME.TYPE', themeObject); */
		const updatedTheme = {
			...themeObject,
			type: themeObject === darkTheme ? themeObject = lightTheme : themeObject = darkTheme,
		};
		console.log('this is the updated theme', theme);
		setTheme(updatedTheme);
		/* 	console.log('THIS IS THEME', theme); */
	};
	return [theme, toggleDarkMode];
};

/*

https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes */
