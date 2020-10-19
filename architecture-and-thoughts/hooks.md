# Custom Hooks

## Custom Hooks

### **useInputState**

> This custom hook enables me to reset a state for a form-field and also gives the ability to update the form field with an event such as e.target.value.

```javascript
import React, { useState } from 'react';

export const useInputState = (initialVal: string) => {
	// call useState, "reserve a piece of state";

	const [value, setState] = useState(initialVal);

	const update = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setState(e.target.value);
	};

	/*  const change = () => {
	  setState('testxxx');
	};
	*/

	const reset = () => {
		setState('');
	};

	return { value, reset, update };
};

```

#### Example Usage with form:

```bash
function Todoform({ addTodo }) {
	const [value, update, reset] = useInputState('');
```

```javascript
<form
	Validate
	onSubmit={(e) => {
		e.preventDefault();
		// addtodo is passed from MUIAPP.jsx, we use it to set the new todo.
		addTodo(value);
		reset();
	}}
>

	<TextField
		fullwidth
		/*  label="Filled" */
		label="Try it out and add a new todo!"
		className={classes.textfield}
		margin="normal"
		/* label="Add New Todo" */
		required
		value={value}
		onChange={update}
	/>

	<Button className={classes.button} type="submit">Submit</Button>
</form>
```

## useToggleState

> This hook enables me to create toggle functionality within state.

```javascript
import { useState } from 'react';

// declare explicit return type.
export const useToggle = (initialVal = false): [boolean, () => void] => {
	// call useState, "reserve a piece of state";

	const [state, setState] = useState(initialVal);
	const toggle = () => {
		setState(!state);
	};

	return [state, toggle];
};

```

**See performance considerations for this implementation**

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

## UseTodoState

> This hook enables me to handle the "Crud operations" for my todos

**We have declared our types here, for easy export and usage within other components**

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

### Usage in project

This hook is used as a "starting point for our application, we can distribute our Todo "crud" operations throughout our project.

We start by passing it into **TodoForm &**  **TodoList -&gt; SingleTodo-&gt;TodoEditForm**  \(component\) which then in return passes it down to the child components that needs the functionality.

We have it **destructured** in our app component from the hook itself, passing the Todos themselves, \(state managed inside the hook gives us the newly updates Todos every time\) is critical.

```javascript
	const {
		todos, addTodo, removeTodo, toggleTodo, editTodo,
	} = useTodos(initialTodos);

```

## UseColorMode & UseTheme

> This hook enables me  to work with the material UI useMediaQuery alongsside, localStorage syncing  and retrieving,  the idea is  to optimize the  process as much as possible, the end result is  returning the preferred theme from the user initially

### Detailed explanation: 

> Initially we try to retrieve our prefersDarkMode from localStorage, if that  does not  exist we return the initial theme passed in \( the  prefersDarkmode boolean from  useMediaQuery\), thus setting dark or light.



The useEffects are added to handle our sideeffects, component rendering and side-effect invocation have to be independent.



> ### First useEffect  \(Avoiding re-renders when prefersDarkmode Changes.
>
> Handle changes to the prefersDarkMode variable if the user suddenly changes their preffered mode, this useEffect. will evaluate upon the initial render reference set with useRef.\( we are referring to a specific DOM element here, which is created at the first render.\) This wont persist across renders, so makes it easy to identify if we are  on the first render,  and sets it to false. thus not changing the colormode, this avoids uneccessary re-renders.

> > if we are on the first render we use the initial value provided by useMediaQuery, if we are not we check if prefersDarkMode is set to true, thus choosing dark  or light mode.
>
> We set the state with the prefersDarkMode boolean so that we have a colorMode state that our useTheme hook can use for setting the theme, along with our tryRetrievingFromLocalStorage being able to grab whats in localStorage or return the current Theme\(the state just mentioned\)
>
>
>
> ### Second useEffect  \(Only syncing localStorage upon new Theme set\)
>
> will make sure to only run whenever our localStorage changes. localStorage would change if the theme changes, the theme is created with the useTheme hook. It listens for any changes to colorMode and only runs then.





> ### ToggleColorMode \(Determine theme based on current theme\)
>
> ToggleColorMode is a toggle functionality which will determine theme based on our current theme. The current theme is  compared to being dark, if its true then set light or dark. basic toggle logic. 
>
> An empty dependency array provided to the toggle means that it only runs once! 
>
>
>
> #### Using the useCallback
>
> This is all wrapped in a useCallback, which memoizes functions, this means that: because of how JS compares equality by reference, 
>
> > Javascript compares equality by reference, the function you create the first time a component renders will be different than the one created in subsequent renders.
> >
> > If you try passing a function as props or state, this means that it will be treated as a prop change every single time. By wrapping it in useCallback, React will know that it's the same function. This not re-rendering unneccessarily.

> #### Using useMemo on the return value:  
>
> If we execute // `useColorMode` multiple times across rerenders, it would not be the same array as before, although its contents not necessarily changed

> // this leads to breaking any optimization depending on the return value of useColorMode \(IMMUTETABILLITY again!\)

>

```javascript

// setting lskey
const lskey = 'mode';

type Theme = 'dark' | 'light';
type ColorMode = 'dark' | 'light';

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


export const useColorMode = (): UseColorModeReturn => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const initialRenderRef = useRef(true);

	const [colorMode, setColorMode] = useState<ColorMode>(
		tryRetrievingFromLocalStorage(prefersDarkMode ? 'dark' : 'light'),
	);

//First useEffect.
	useEffect(() => {
		
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
		} else {
	
			setColorMode(prefersDarkMode ? 'dark' : 'light');
		}
	}, [prefersDarkMode]);
	

	useEffect(() => {
	
		trySyncToLocalStorage(colorMode);
	}, [colorMode]);

	
	const toggleColorMode = useCallback(() => {
		
		setColorMode(mode => (mode === 'dark' ? 'light' : 'dark'));
	
	}, []);

	
	return useMemo(() => ({ colorMode, toggleColorMode }), [
		colorMode,
		toggleColorMode,
	]);
};

```

```javascript

export const useTheme = () => {
	const { colorMode } = useColorMode();

	return useMemo(

		() => createMuiTheme(colorMode === 'dark' ? darkTheme : lightTheme),
		[colorMode],
	);
};
```

## Would Context API be needed to avoid "prop-drilling" in this scenario?

Context API, using the useContext hook would certainly enable me to have a global provider for the functionality needed in each component, due to time constraints this is not implemented.

A classic Todoapp would not need context API, and would be sort of over engineering here.

see the following chapters here:

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

{% page-ref page="optimization.md" %}

