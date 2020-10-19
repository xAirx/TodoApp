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

> This hook enables me to handle the "Crud operations" for my Todos

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

A classic Todo app would not need context API, and would be sort of over engineering here.

see the following chapters here:

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

{% page-ref page="optimization.md" %}

