# TODO: Custom Hooks

## Custom Hooks

### **useInputState**

{% hint style="info" %}
This custom hook enables me to reset a state for a formfield and also gives the abillity to update the formfield with an event such as e.target.value.
{% endhint %}

```bash
import { useState } from 'react';

function useInputState(initialVal = 'testdata') {
	// call useState, "reserve a piece of state";

	const [state, setState] = useState(initialVal);

	const update = (e: React.SyntheticEvent) => {
		setState(e.target.value);
	};

	/*  const change = () => {
	  setState('testxxx');
	};
   */

	const reset = () => {
		setState('');
	};

	return [state, update, reset];
}

export default useInputState;

```

### Example Usage with form:

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

```javascript
import { useState } from 'react';

//declare explicit return type.
export const useToggle = (initialVal = false): [boolean, () => void] => {
	// call useState, "reserve a piece of state";

	const [state, setState] = useState(initialVal);
	const toggle = () => {
		setState(!state);
	};

	return [state, toggle];
}

```

## \(NOT DONE\) useLocalStorageState

This hook was created to be able to easily store our todos in localstorage, so that when the user logs in or out the data is persisted and we can cut down on graphQL calls.

**See performance considerations for this implementation**

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}



{% code title="" %}
```javascript
// if there is nothing in localStorage under the key we will use the defaultVal.
function UseLocalStorageState(key, defaultVal) {
	
	/*
  Make a piece of state but initialize it to some piece of local storage and
   by the way whenever it changes make sure you update local storage as well and then
   return that piece of state and a function to set
  
  that piece of state. */

	const [state, setState] = useState(() => {
		let val;
		try {
			// See if there is something in localStorage with val...
			val = JSON.parse(
				window.localStorage.getItem(key) || String(defaultVal),
			);
		} catch (e) {
			/// if there is nothing in localStorage set val to defaultVal
			val = defaultVal;
		}
		return val;
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state]);
	return [state, setState];
}
```
{% endcode %}

## \(NOT DONE\) UseTodoState

Write more here:



We have declared our types here, for easy export and usage within other components.

```javascript
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* import { useState } from 'react'; */
import uuid from 'uuid/v4';
import useLocalStorageState from './useLocalStorageState';
import { useCallback } from 'react';

export type AddTodoHandler = (value: string) => void;
export type RemoveTodoHandler = (id: number) => void;
export type EditTodoHandler = (id: number, value: string) => void;
export type ToggleTodoHandler = (id: number) => void;
export type Todos = {
	id: number;
	task: string;
	completed: boolean
}

export const useTodos = (initialTodos: Todos[]) => {
	// UselocalStorage state will initialize the state and make the state for us.
	// Bsed off of localstorage. we are using useLocalStorageState to make sure to handle the
	// Localstorage functionality here.
	const [todos, setTodos] = useLocalStorageState('todos', initialTodos);

	console.log('THESE ARE THE TODOS INSIDE USETODOSTATE HOOK', todos);

	const removeTodo: RemoveTodoHandler = useCallback((todoId) => {
		console.log('removetodocalled');

		const updatedTodos = todos.filter((todo: { id: number; }) => todo.id !== todoId);
		console.log(updatedTodos);

		setTodos(updatedTodos);

	}, [])

	const addTodo: AddTodoHandler = useCallback((newTodoText) => {
		setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
	}, [])

	const editTodo: EditTodoHandler = useCallback((todoId, newTodoText) => {
		console.log('editTodoCalled');
	
		const updatedTodos = todos.map((todo: { id: number; }) => (todo.id === todoId
			? { ...todo, task: newTodoText } : todo));
		console.log('this is the new todos changed from edit', updatedTodos);
		setTodos(updatedTodos);
		/* console.log('These are the updated todos', todos); */
	}, [])
	const toggleTodo: ToggleTodoHandler = useCallback((todoId) => {
		const updatedTodos = todos.map((todo: { id: number; completed: boolean; }) => (todo.id === todoId ? {
			...todo,
			completed: !todo.completed,
		} : todo));
		setTodos(updatedTodos);
	}, [])


	return {
		// Return our todos.
		todos,
		removeTodo,
		addTodo,
		editTodo,
		toggleTodo
	};
};

```

## Usage of useCallback

see the below chapters.

## Performance optimizing hooks 

see the following chapter here:

{% page-ref page="../performance-considerations/optimization.md" %}

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

