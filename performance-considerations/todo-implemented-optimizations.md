# Implemented optimizations

##  **Quick overview of  Implementations in the project:**

{% tabs %}
{% tab title="useMemo" %}
**We can use useMemo to ensure that we are not triggering re-renders unless needed when our theme prop changes**

```javascript

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


```
{% endtab %}

{% tab title="useCallback" %}
**useCallback\(\) should only be used when the returned function needs to retain reference equality, an example being when the function is passed as a prop**

We can use useCallback to only render when our  todos passed to our crud operations are changed.

```javascript
const removeTodo: RemoveTodoHandler = useCallback(id => {
		setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));
	}, []);

	const addTodo: AddTodoHandler = useCallback(task => {
		setTodos(oldTodos => oldTodos.concat({ completed: false, id: uuid(), task }));
	}, []);

```
{% endtab %}

{% tab title="useEffect" %}
```javascript
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
```
{% endtab %}

{% tab title="useRef" %}
```javascript

	// prefersDarkMode is true localStorage says false so state is initially false then
	// useEffect comes in and sets it to true although we have a different value stored
	// we wouldnt want that localStorage presence indicates that you have a prior visit with a changed theme */

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
```
{% endtab %}
{% endtabs %}

## Detailed overview & overview of the refactoring process and thought process

## UseTodoState hook

{% tabs %}
{% tab title="Old Structure" %}
> Anyomous functions are a no go, memory is wasted, as each time this component is rerendered, new memory is used instead of allocating a single piece of memory one. with named functions. 
>
> Each operation here will also trigger a re-render, a great useCase for avoiding unneeded re-renders if the props passed has not changed.

```javascript

import { useState } from 'react';
import uuid from 'uuid/v4';
import useLocalStorageState from './useLocalStorageState';

export default (initialTodos) => {
	// UselocalStorage state will initialize the state and make the state for us.
	// Bsed off of localstorage. we are using useLocalStorageState to make sure to handle the
	// Localstorage functionality here.
	const [todos, setTodos] = useLocalStorageState('todos', initialTodos);

	console.log('THESE ARE THE TODOS INSIDE USETODOSTATE HOOK', todos);

	return {
		todos,

		addTodo: (newTodoText) => {
			setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
		},
		removeTodo: (todoId) => {
			console.log('removetodocalled');
			// filter out removed todo
			const updatedTodos = todos.filter((todo) => todo.id !== todoId);
			console.log(updatedTodos);
			// call setTodos with new todosArray
			setTodos(updatedTodos);
			/* console.log('These are the updated todos', todos); */
		},
		editTodo: (todoId, newTodoText) => {
			console.log('editTodoCalled');
			// filter out removed todo
			/*  const updatedTodos = todos.filter((todo) => todo.id === todoId);
			   /*  console.log(updatedTodos); */
			/*  updatedTodos.task = newTodoText; */
			// call setTodos with new todosArray
			const updatedTodos = todos.map((todo) => (todo.id === todoId
				? { ...todo, task: newTodoText } : todo));
			console.log('this is the new todos changed from edit', updatedTodos);
			setTodos(updatedTodos);
			/* console.log('These are the updated todos', todos); */
		},

		toggleTodo: (todoId) => {
			const updatedTodos = todos.map((todo) => (todo.id === todoId ? {
				...todo,
				completed: !todo.completed,
			} : todo));
			setTodos(updatedTodos);
		},

	};
};
```
{% endtab %}

{% tab title="New Structure" %}
> All functionality is in a single hook useTodoState.tsx

### UseTodoStateHook

UseCallbacks are implemented and LocalStorage syncing and retriveing added to avoid unneeded operations. 

Our UseTodos hook will take the initial todos passed from APP, it will try retrieve the Todos from LocalStorage, if they do not exist from localStorage, the inital Todos are returned,and set into state.

our UseEffect will run if the Todos are changed, and only if the todos are changed the syncing to localStorage happens.

Our crud operations are wrapped im useCallback, with an empty array, this means that we instruct useCallback to run only once, and since useCallback returns a memoized version of the callback, that only changes if one ofo the dependencies are changed.

We can achieve reference equality \(MEMORY\), so that we prevent unneeded renders.

```javascript
import { useCallback, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export type AddTodoHandler = (value: string) => void;
export type RemoveTodoHandler = (id: string) => void;
export type EditTodoHandler = (id: string, value: string) => void;
export type ToggleTodoHandler = (id: string) => void;
export type Todo = {
	id: string;
	task: string;
	completed: boolean;
};

const lsKey = 'todos';

const tryRetrievingFromLocalStorage = (initial: Todo[]): Todo[] => {
	try {
		const stored = localStorage.getItem(lsKey);
		return stored ? JSON.parse(stored) : initial;
	} catch {
		return initial;
	}
};

const trySyncToLocalStorage = (todos: Todo[]) => {
	try {
		localStorage.setItem(lsKey, JSON.stringify(todos));
	} catch {
		// ignore
	}
};

export const useTodos = (initialTodos: Todo[]) => {
	const [todos, setTodos] = useState<Todo[]>(
		tryRetrievingFromLocalStorage(initialTodos),
	);

	useEffect(() => {
		trySyncToLocalStorage(todos);
	}, [todos]);

	const removeTodo: RemoveTodoHandler = useCallback(id => {
		setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));
	}, []);

	const addTodo: AddTodoHandler = useCallback(task => {
		setTodos(oldTodos => oldTodos.concat({ completed: false, id: uuid(), task }));
	}, []);

	const editTodo: EditTodoHandler = useCallback((id, task) => {
		setTodos(oldTodos => oldTodos.map(todo => {
			if (todo.id === id) {
				return { ...todo, task };
			}

			return todo;
		}));
	}, []);

	const toggleTodo: ToggleTodoHandler = useCallback(id => {
		setTodos(current => current.map(todo => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}

			return todo;
		}));
	}, []);

	return {
		addTodo,
		editTodo,
		removeTodo,
		todos,
		toggleTodo,
	};
};


```
{% endtab %}
{% endtabs %}

### Alternative solutions \(using an API to grab data\)

{% tabs %}
{% tab title="Optimistic" %}
```javascript
  const optimisticAddTodo: AddTodoHandler = useCallback((task) => {

    const newTodo = { completed: false, id: uuid(), task };

    setTodos((oldTodos) => oldTodos.concat(newTodo));

    // fire and forget approach. the ui was already updated above! we don't care
    // whether the request fails or not. we expect it not to, but its not relevant
    // for the direct continuation of the user flow. feels better, 
    no waiting time!
    axios.post(endpoint, newTodo).catch((error) => {
      // do whatever you want here
    });
  }, []);
  
  
```
{% endtab %}

{% tab title="Conservative" %}
```javascript
 const conservativeAddTodo: AddTodoHandler = useCallback(async (task) => {
    // there are multiple approaches possible.
    // this is the conservative one: create a todo, send it to your endpoint
    // then, _when its finished_, reflect the new state in the UI by setting
    // state
    const newTodo = { completed: false, id: uuid(), task };

    try {
      await axios.post(endpoint, newTodo);

      setTodos((oldTodos) => oldTodos.concat(newTodo));
    } catch {
      // do whatever you want here
    }
  }, []);
  
```
{% endtab %}
{% endtabs %}



## useColorMode hook

> #### Structure of your components <a id="structure-of-your-components"></a>
>
> An even better way of improving re-renders is by restructuring your code a little bit.
>
> Be careful where you place your logic. If you put everything in the root component of your application, all the `React.memo` functions in the world won't help you to fix your performance problems.
>
> ### Its important to keep state close to the source, this also makes it easier to test.

{% page-ref page="../unittesting/overview-of-unittests.md" %}



{% tabs %}
{% tab title="Initial structure" %}
> Functionality is scattered across App Component and the useDarkModeHook within myTheme.tsx
>
> Here state is controlled both within myTheme.tsx and our App component A good opportunity to encapsulate everything into myTheme.tsx and handle state close to the source.
>
> As well as adding performance optimizations across components is not ideal.

```javascript
  const [theme, toggleDarkMode] = useDarkmode();
  console.log('THIS IS THEME INSIDE APP', theme);

  const themeConfig = createMuiTheme(theme);
```

```javascript
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
```
{% endtab %}

{% tab title="Optimized structure" %}
### Detailed explanation: 

Everything is extracted into a myTheme.tsx creating a single component a custom hook to handle state aswell. this also makes it easier to test.

Here naming is also improved

Along with optimizations handling sideEffects, and render optimization using useCallback and useMemo + useRef.



### useState

> Initially we try to retrieve our prefersDarkMode from localStorage, if that  does not  exist we return the initial theme passed in \( the  prefersDarkmode boolean from  useMediaQuery\), thus setting dark or light.

> The useEffects are added to handle our side effects, component rendering and side-effect invocation have to be independent.

### useEffect  \(Only syncing localStorage upon new Theme set\)

> will make sure to only run whenever our localStorage changes. localStorage would change if the theme changes, the theme is created with the useTheme hook. It listens for any changes to colorMode and only runs then.



### ToggleColorMode \(Determine theme based on current theme\)

> ToggleColorMode is a toggle functionality which will determine theme based on our current theme. The current theme is  compared to being dark, if its true then set light or dark. basic toggle logic. 
>
> ToggleColorMode is a toggle functionality which will determine theme based on our current theme. The current theme is compared to being dark, if its true then set light or dark. basic toggle logic. An empty dependency array provided to the toggle means that it only runs once!
>
> oh wow

**Using the useCallback**

> Using the useCallback This is all wrapped in a useCallback, which memoizes functions, this means that: because of how JS compares equality by reference, Javascript compares equality by reference, the function you create the first time a component renders will be different than the one created in subsequent renders.
>
> If you try passing a function as props or state, this means that it will be treated as a prop change every single time. By wrapping it in useCallback,
>
> React will know that it's the same function. This not re-rendering unnecessarily.

**The Memoized Return**

> In the end we return a memoized array. \[\] === \[\] is _false_. so if we execute `useColorMode` multiple times across rerenders, it would not be the same array as before, although its contents not necessarily changed. this leads to breaking any optimization depending on the return value of `useColorMode such as useTheme` so we're avoiding this here hurray for  \(IMMUTETABILLITY again!\)

### UseTheme

Handles setting the theme, it grabs colorMode \(state\) from useColorMode\(\), only if colormode changes, and then creates our MUItheme.



```javascript
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

```
{% endtab %}
{% endtabs %}

## Downside and Final thoughts of the approach

Theres one logical downside here which is an inherent hook problem useTheme uses useColorMode. 

The component uses useColorMode so the function will be executed two times.

### Alternative approach

 The alternative would be to expose toggleColorMode from useTheme too but then useTheme would be doing more than it has to in reality.

