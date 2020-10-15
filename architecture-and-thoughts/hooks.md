# Custom Hooks

## Custom Hooks

### **useInputState**

> This custom hook enables me to reset a state for a form-field and also gives the abillity to update the form field with an event such as e.target.value.

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

> This hook enables me to create toggle functionality within state.

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

## useSyncTodosToLocalStorage

> This hook was created to be able to easily store our todos in localstorage, so that when the user logs in or out the data is persisted and we can cut down on graphQL calls.

**See performance considerations for this implementation**

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

#### 



#### Alternative naming: useLocalStorageState

{% hint style="danger" %}


> This Hook could have been typed more generically as DATA, instead of type todo, but because of time constraints this was what I opted for,  
>   
> An alternative solution would be to use generics and go in this direction:
{% endhint %}

```javascript
"The hook does stores a value
not specifically only todos"

function useLocalStorageState<Data>(key: string, defaultValue: Data): Data {}

then you can do:

const initialTodos = useLocalStorageState<Todo[]>(....);
```



```javascript
import { useState, useEffect } from 'react';
import { Todo } from './useTodoState';

// if there is nothing in localStorage under the key we will use the defaultVal.
function UseSyncTodosToLocalStorage(key: string, defaultVal: Todo) {

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
/*
```

## UseTodoState

> This hook enables me to handle the crudoperations for my todos, here we also use the UseSyncTodosToLocalStorage hook to sync our todos to localStorage.

**We have declared our types here, for easy export and usage within other components**

```javascript
import uuid from 'uuid/v4';
import UseSyncTodosToLocalStorage from './useSyncTodosToLocalStorage';
import { useCallback } from 'react';

export type AddTodoHandler = (value: string) => void;
export type RemoveTodoHandler = (id: number) => void;
export type EditTodoHandler = (id: number, value: string) => void;
export type ToggleTodoHandler = (id: number) => void;
export type Todo = {
	id: number;
	task: string;
	completed: boolean
}[]

export const useTodos = (initialTodos: Todo) => {
	// UselocalStorage state will initialize the state and make the state for us.
	// Bsed off of localstorage. we are using useLocalStorageState to make sure to handle the
	// Localstorage functionality here.


	const [todos, setTodos] = UseSyncTodosToLocalStorage('todos', initialTodos);

	console.log('THESE ARE THE TODOS INSIDE USETODOSTATE HOOK', todos);

	const removeTodo: RemoveTodoHandler = useCallback((todoId) => {
		console.log('removetodocalled');
		// filter out removed todo
		const updatedTodos = todos.filter((todo: { id: number; }) => todo.id !== todoId);
		console.log(updatedTodos);
		// call setTodos with new todosArray
		setTodos(updatedTodos);
		/* console.log('These are the updated todos', todos); */
	}, [])

	const addTodo: AddTodoHandler = useCallback((task) => {
		setTodos([...todos, { id: uuid(), task, completed: false }]);
	}, [])

	const editTodo: EditTodoHandler = useCallback((todoId, task) => {
		console.log('editTodoCalled');
		// filter out removed todo
		/*  const updatedTodos = todos.filter((todo) => todo.id === todoId);
		   /*  console.log(updatedTodos); */
		/*  updatedTodos.task = newTodoText; */
		// call setTodos with new todosArray
		const updatedTodos = todos.map((todo: { id: number; }) => (todo.id === todoId
			? { ...todo, task } : todo));
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

### Usage in project

This hook is used as a "starting point for our application, we can distribute our todo "crud" operations throughout our project.

We start by passing it into **TodoForm &**  **TodoList -&gt; SingleTodo-&gt;TodoEditForm**  \(component\) which then in return passes it down to the child components that needs the functionality.

We have it **destructured** in our app component from the hook itself, passing the Todos themselves, \(state managed inside the hook gives us the newly updates Todos every time\) is critical.

```javascript
	const {
		todos, addTodo, removeTodo, toggleTodo, editTodo,
	} = useTodos(initialTodos);

```

## Would Context API be needed to avoid "prop-drilling" in this scenario?

Context API, using the useContext hook would certainly enable me to have a global provider for the functionality needed in each component, due to time constraints this is not implemented.

A classic todoapp would not need context API, and would be sort of over engineering here.

## Usage of useCallback

see the following chapters here:

{% page-ref page="optimization.md" %}

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

