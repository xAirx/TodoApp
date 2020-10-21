/* eslint-disable no-unused-vars */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	useCallback, useEffect, useMemo, useState,
} from 'react';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const lightTheme: ThemeOptions = {
	palette: {
		type: 'light',
		background: {
			paper: 'linear-gradient(130deg, #5D21D0 80%, #0c056d 10%)',

		},
	},
};

const darkTheme: ThemeOptions = {
	palette: {
		type: 'dark',
		background: {
			paper: 'linear-gradient(130deg, #0c056d 80%, #5D21D0  10%)',
		},
	},
};

// setting lskey
const lskey = 'mode';

// We want our comparison to themes too be type safe.
// Dark and light are strings.
// if we put any string into the state, useStatet will accept it.
// This could lead to typos.
// To make sure we get the right type we add the types here.
type Theme = 'dark' | 'light';
type ColorMode = 'dark' | 'light';

// Setting colorMode to the type of ColorMode.
// This key is used for comparisons.

type UseColorModeReturn = {
	colorMode: ColorMode;
	toggleColorMode: () => void;
};

const trySyncToLocalStorage = (theme: Theme) => {
	try {
		localStorage.setItem(lskey, theme);
	} catch {
		// ignore
	}
};

const tryRetrievingFromLocalStorage = (theme: Theme): Theme => {
	try {
		const stored = localStorage.getItem(lskey);

		return stored ? JSON.parse(stored) : theme;
	} catch {
		return theme;
	}
};

// useColorMode Function, with the UseColorModeReturn type.
export const useColorMode = (): UseColorModeReturn => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// prefersDarkMode is true localStorage says false so state is initially false then
	// useEffect comes in and sets it to true although we have a different value stored
	// we wouldnt want that localStorage presence indicates that you have a prior visit with a changed theme */

	const [colorMode, setColorMode] = useState<ColorMode>(
		// Grabbing data from localStorage, is passed our prefersDarkmode, if nothing is found the current theme is the preferred theme.
		tryRetrievingFromLocalStorage(prefersDarkMode ? 'dark' : 'light'),
	);

	// IF LOCALSTORAGE CHANGES:
	/* 	will make sure to only run whenever our localStorage changes. localStorage would change if the theme changes,
	the theme is created with the useTheme hook. It listens for any changes to colorMode and only runs then. */
	useEffect(() => {
		// whenever state changes, sync it
		trySyncToLocalStorage(colorMode);
		console.log('setting new colormode after updating state', colorMode);
	}, [colorMode]);

	// IF WE WANT TO TOGGLE THE COLORMODE (THEME)
	/* ToggleColorMode is a toggle functionality which will determine theme based on our current theme.
	The current theme is  compared to being dark, if its true then set light or dark. basic toggle logic.
	An empty dependency array provided to the toggle means that it only runs once!

	Using the useCallback
	This is all wrapped in a useCallback, which memoizes functions, this means that: because of how JS compares equality by reference,
	Javascript compares equality by reference, the function you create the first time a component
	renders will be different than the one created in subsequent renders.
	If you try passing a function as props or state, this means that it will be treated as a
	prop change every single time. By wrapping it in useCallback, React will know that it's the same function.
	This not re-rendering unneccessarily.     */

	const toggleColorMode = useCallback(() => {
		// callback version again. determine the other theme based on the current
		// theme
		console.log('We are running togglecolormode');
		// here its like saying prevProps => newProps:
		// We can do this because of immuteabillity!
		setColorMode(mode => (mode === 'dark' ? 'light' : 'dark'));
		// empty dependency array means memoize once  and return.
	}, []);

	// return a memoized array. [] === [] is _false_. so if you execute
	// `useColorMode` multiple times across rerenders, it would not be the same
	// array as before, although its contents not necessarily changed.
	// this leads to breaking any optimization depending on the return value of
	// `useColorMode`, so we're avoiding this here
	// (IMMUTETABILLITY again!) <----

	return useMemo(() => (
		// expose colorMode so we can use it in useTheme below
		// expose togglecolormode so we can use it in app.
		/* 		console.log('THIS IS COLORMODE RETURNED from useColorMode', colorMode), */
		{ colorMode, toggleColorMode }),
		// depency array
		[
			colorMode,
			toggleColorMode,
		]);
};

export const useTheme = (colorMode: ColorMode) => useMemo(() => createMuiTheme(colorMode === 'dark' ? darkTheme : lightTheme), [
	colorMode,
]);
