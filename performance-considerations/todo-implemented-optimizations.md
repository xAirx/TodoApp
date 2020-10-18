# TODO REWRITE: Implemented optimizations

> React enables web applications to update their user interfaces \(UIs\) quickly, but that does not mean your medium or large React application will perform efficiently.

> Its performance will depend on how you use React when building it, and on your understanding of how React operates and the process through which components live through the various phases of their life-cycle.

> React offers a lot of performance improvements to a web app, and you can achieve these improvements through various techniques, features, and tools.

## TODO REWRITE: Why do we need optimizations?

React rendering & problems with it.

{% tabs %}
{% tab title="TLDR" %}
Since React renders "Reactively" based on state, passing props and more , its important to be able to control renders throughout larger projects for performance reasons.

Parent components will trigger child component re-renders, and diffing on previous  props and next props can trigger  renders which we forexample want to happen when specific props changes or,  passed props to a function.

**For size's sake I will focus on the two components in my project**
{% endtab %}

{% tab title="Longer Read" %}
Rendering is the process during which React moves down the component tree starting at the root, looking for all the components flagged for update, asking them to describe their desired UI structure based on the current combination of props and state.

For each flagged component, React will call its render\(\) method \(for class components\) or FunctionComponent\(\) \(for function components\), and save the output produced after converting the JSX result into a plain JS object, using React.createElement\(\).

After collecting the render output from the entire component tree,

React will diff the new tree \(the virtual DOM\) with the current DOM tree and collect the list of changes that need to be made to the DOM to produce the desired UI structure.

If the new state of the VDOM requires a UI change, the ReactDOM library will efficiently do this by trying to update only what needs to be updated.

For example, if only the attribute of an element changes, React will only update the attribute of the HTML element by calling document.setAttribute \(or something similar\).

When the VDOM gets updated, React compares it to to a previous snapshot of the VDOM and then only updates what has changed in the real DOM.

If nothing changed, the real DOM won't be updated at all.

 This process of comparing the old VDOM with the new one is called diffing.

Real DOM updates are slow because they cause an actual re-draw of the UI.

 React makes this more efficient by updating the smallest amount possible in the real DOM.

React's default behavior is to recursively render all child components inside of it when a parent component is rendered.

This means that it does not care if a component's props have changed - as long as the parent component rendered, its children will render unconditionally.

To put this another way, calling setState\(\) in the root component without any other changes, will cause React to re-render every single component in the component tree.

Most likely, most of the components will return the exact same render output as the last render, \(PURE COMPONENTS\)  meaning React will not have to make any changes to the DOM, but the rendering and diffing calculations will be performed regardless, taking time and effort.

React has to run its diffing algorithm on each of those components to check whether it should update the UI.

All your code in these render functions or function components will be executed again.

The first point is arguably not that important since React manages to calculate the difference quite efficiently.

The danger lies in the code that you wrote is being executed over and over on every React render.

This is why we need optimizations

There a couple ways that triggers react to rerender but 
{% endtab %}
{% endtabs %}

## TODO REWRITE Controlling when a component should update

MyTheme.TSX which includes the useColorMode Hook, and useTodoState which includes the useTodos hook.

Apparent issues a re-render will happen regardless if props have changed or not, when it comes to child components.

### useMemo and useCallback

useCallback\(\) and useMemo\(\) are React hooks that return memoized functions and values, respectively.

> An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

These two hooks are the same, useCallback\(\) is simply a shorthand for using useMemo\(\) when it returns a function.

They both take a callback function as their first argument and an array of dependencies as their second.

When these dependencies change, the passed callback function will run, thus returning an updated value.

This happens while the component is rendering, it’s important to keep that in mind so that no side effects occur inside of these hooks since that will cause more re-renders and decrease performance.

SideEffects should be provided to UseEffect since useEffect is the hook that runs side-effects independently of rendering. after each completed render or fire them when certain values have changed  \(dependency array\)

##  **TODO REWRITE Implementations in the project:**

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
{% endtabs %}

## TODO: UseTodoState hook

{% tabs %}
{% tab title="Old Structure" %}
> Anyomous functions are a no go, memory is wasted, as each time this component is rerendered, new memory is used instead of allocating a single piece of memory one. with named functions. 
>
> Each operation here will also trigger a re-render, a great useCase for checking wether or not the props have really changed or not.

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

{% tab title="Performance" %}
Todo crud functionality
{% endtab %}

{% tab title="New Structure" %}
> All functionality is in a single hook useTodoState.tsx

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

{% tab title="Performance increase" %}

{% endtab %}
{% endtabs %}



### Alternative solutions \(using an API to grab data\)

{% tabs %}
{% tab title="Optimistic" %}
```javascript
  const optimisticAddTodo: AddTodoHandler = useCallback((task) => {
    // this is the alternative approach, youll find content about it 
    //if you search
    // for "optimistic ui"

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





## TODO REWRITE useColorMode hook

> #### Structure of your components <a id="structure-of-your-components"></a>
>
> An even better way of improving re-renders is by restructuring your code a little bit.
>
> Be careful where you place your logic. If you put everything in the root component of your application, all the `React.memo` functions in the world won't help you to fix your performance problems.



**Moving all code that handles the state into a Seperate component**:

{% tabs %}
{% tab title="Initial structure" %}
> Functionality is scattered across App Component and the useDarkModeHook within myTheme.tsx
>
> Here state is controlled both within myTheme.tsx and our App component A good opportunity to encapsulate everything into myTheme.tsx

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

{% tab title="Performance" %}
Changing theme and inital load + localStorage
{% endtab %}

{% tab title="Optimized structure" %}
> Everything is extracted into a myTheme.tsx creating a single component a custom hook to handle state aswell. this also makes it easier to test.

> Here naming is also improved.
>
> Along with optimizations handling sideeffects, and useCallback in combination with useMemo for render control.

```javascript
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

	//prefersDarkMode is true localStorage says false so state is initially false then 
	//useEffect comes in and sets it to true although we have a different value stored
	//we wouldnt want that localStorage presence indicates that you have a prior visit with a changed theme */
	
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
```
{% endtab %}

{% tab title="Performance increase" %}
Changing theme and inital load + localStorage
{% endtab %}
{% endtabs %}



