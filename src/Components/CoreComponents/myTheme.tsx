/* eslint-disable no-unused-vars */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	useCallback, useEffect, useMemo, useState, useRef,
} from 'react';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const lightTheme: ThemeOptions = {
	palette: {
		primary: {
			main: '#FFFFFF',
		},
		type: 'light',
		background: {
			paper: 'linear-gradient(130deg, #96bb7c 80%, #184d47 10%)',

		},
	},
};

const darkTheme: ThemeOptions = {
	palette: {
		primary: {
			main: '#FFFFFF',
		},
		type: 'dark',
		background: {
			paper: 'linear-gradient(130deg, #0c2623 80%, #96bb7c 10%)',
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

	const initialRenderRef = useRef(true);

	const [colorMode, setColorMode] = useState<ColorMode>(
		// Grabbing data from localStorage, is passed our prefersDarkmode, if nothing is found the current theme is the preferred theme.
		tryRetrievingFromLocalStorage(prefersDarkMode ? 'dark' : 'light'),
	);

	// IF PREFERRED THEME CHANGES
	// Handle changes to the prefersDarkMode variable if the user suddenly changes their preffered mode,
	/* 	this useEffect. will evaluate upon the initial render reference set with useRef.( we are referring to a
			specific DOM element here, which is created at the first render.) This wont persist across renders,
			so makes it easy to identify if we are  on the first render,
			  and sets it to false. thus not changing the colormode, this avoids uneccessary re-renders. */
	useEffect(() => {
		// on the initial render, we want to skip this effect. for this we need
		// a non-reactive value which doesn't change when we change it. classic
		// use case for `useRef`
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
		} else {
			// changing system color mode will overwrite chosen, if mismatching

			/* We set the state with the prefersDarkMode boolean so that we have a colorMode state that our useTheme hook can use
			for setting the theme, along with our tryRetrievingFromLocalStorage being able to grab whats
			 in localStorage or return the current Theme(the state just mentioned) */
			setColorMode(prefersDarkMode ? 'dark' : 'light');
		}
	}, [prefersDarkMode]);

	// IF LOCALSTORAGE CHANGES:
	/* 	will make sure to only run whenever our localStorage changes. localStorage would change if the theme changes,
	the theme is created with the useTheme hook. It listens for any changes to colorMode and only runs then. */
	useEffect(() => {
		// whenever state changes, sync it
		trySyncToLocalStorage(colorMode);
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

		// here its like saying prevProps => newProps:
		// We can do this because of immuteabillity!
		setColorMode(mode => (mode === 'dark' ? 'light' : 'dark'));
		// empty dependency array means
	}, []);

	// return a memoized array. [] === [] is _false_. so if you execute
	// `useColorMode` multiple times across rerenders, it would not be the same
	// array as before, although its contents not necessarily changed.
	// this leads to breaking any optimization depending on the return value of
	// `useColorMode`, so we're avoiding this here
	// (IMMUTETABILLITY again!) <----
	return useMemo(() => ({ colorMode, toggleColorMode }), [
		colorMode,
		toggleColorMode,
	]);
};

export const useTheme = () => {
	const { colorMode } = useColorMode();

	// return a memoized array. [] === [] is _false_. so if you execute
	// `useTheme` multiple times across rerenders, it would not be the same
	// array as before, although its contents not necessarily changed.
	// this leads to breaking any optimization depending on the return value of
	// `useTheme`, so we're avoiding this here

	return useMemo(
		// based on the currently selected color mode, return a theme

		() => createMuiTheme(colorMode === 'dark' ? darkTheme : lightTheme),
		[colorMode],
	);
};
