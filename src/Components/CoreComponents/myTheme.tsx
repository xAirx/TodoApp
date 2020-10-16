/* eslint-disable no-unused-vars */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	useCallback, useEffect, useMemo, useState, useRef,
} from 'react';
import { createMuiTheme, ThemeOptions } from '@material-ui/core/styles';

const lightTheme: ThemeOptions = {
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

const darkTheme: ThemeOptions = {
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

const lskey = 'mode';

type Theme = 'dark' | 'light';
/* you want theme and comparing with it always to be type safe
[10:22 PM] Chevron: because dark light are specific strings
[10:22 PM] Chevron: not just any string
[10:22 PM] Chevron: and if you put any string into state
[10:22 PM] Chevron: useState will happily accept any string
[10:22 PM] Chevron: so that would favor typos
[10:23 PM] Chevron: but since our state is entirely reliant on having the same strings all the time
[10:23 PM] Chevron: its important to assign the cases to a type */

type ColorMode = 'dark' | 'light';

type UseColorModeReturn = {
	colorMode: ColorMode;
	toggleColorMode: () => void;
};
/*
its a type in the shape of an object
[10:45 PM] Chevron: with key colormode which must be of type ColorMode
[10:45 PM] Chevron: and key toggleColorMode which must be of that function shape */

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

export const useColorMode = (): UseColorModeReturn => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	/* 	prefersDarkMode is true
		[10:15 PM] Chevron: - localStorage says false
		[10:15 PM] Chevron: so state is initially false
		[10:16 PM] Chevron: then useEffect comes in
		[10:16 PM] Chevron: and sets it to true
		[10:16 PM] Chevron: although you have a different value stored
		[10:16 PM] Chevron: we wouldnt want that
		[10:16 PM] Chevron: localStorage presence indicates that you have a prior visit with a changed theme */
	const initialRenderRef = useRef(true);

	const [colorMode, setColorMode] = useState<ColorMode>(
		tryRetrievingFromLocalStorage(prefersDarkMode ? 'dark' : 'light'),
	);

	useEffect(() => {
		// on the initial render, we want to skip this effect. for this we need
		// a non-reactive value which doesn't change when we change it. classic
		// use case for `useRef`
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
		} else {
			// changing system color mode will overwrite chosen, if mismatching
			setColorMode(prefersDarkMode ? 'dark' : 'light');
		}
	}, [prefersDarkMode]);

	useEffect(() => {
		// whenever state changes, sync it
		trySyncToLocalStorage(colorMode);
	}, [colorMode]);

	const toggleColorMode = useCallback(() => {
		// callback version again. determine the other theme based on the current
		// theme
		setColorMode(mode => (mode === 'dark' ? 'light' : 'dark'));
	}, []);

	// return a memoized array. [] === [] is _false_. so if you execute
	// `useColorMode` multiple times across rerenders, it would not be the same
	// array as before, although its contents not necessarily changed.
	// this leads to breaking any optimization depending on the return value of
	// `useColorMode`, so we're avoiding this here
	return useMemo(() => ({ colorMode, toggleColorMode }), [
		colorMode,
		toggleColorMode,
	]);
};

export const useTheme = () => {
	const { colorMode } = useColorMode();

	return useMemo(
		// based on the currently selected color mode, return a theme

		() => createMuiTheme(colorMode === 'dark' ? darkTheme : lightTheme),
		[colorMode],
	);
};

/* theres one logical downside here which is an inherent hook problem
[10:36 PM] Chevron: - useTheme uses useColorMode
[10:36 PM] Chevron: - your component uses useColorMode
[10:36 PM] Chevron: so thefunction will be executed 2x
[10:36 PM] Chevron: ultimately its fine
[10:36 PM] Chevron: as in you wont notice it
[10:36 PM] Chevron: but gotta be aware
[10:36 PM] Chevron: the alternative would be to expose toggleColorMode from useTheme too
[10:36 PM] Chevron: and guess what
[10:37 PM] Chevron: then useTheme would do more than it should :neutral_face: */
