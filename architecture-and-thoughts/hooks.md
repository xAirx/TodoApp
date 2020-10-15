# TODO: Custom Hooks

## Custom Hooks

### **useInputState**

{% hint style="info" %}
This custom hook enables me to reset a state for a form-field and also gives the abillity to update the formfield with an event such as e.target.value.
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

> This hook \*\*\*\*\*\*\*\*\*\*

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

## useLocalStorageState

> This hook does \*\*\*\*\*

This hook was created to be able to easily store our Todos in localstorage, so that when the user logs in or out the data is persisted and we can cut down on graphQL calls.



> The Hook could have been typed more generically as DATA, instead of type Todo, but because of time constraints this was what I opted for,  
>   
> An alternative solution would be to use generics and go in this direction:

```javascript
"The hook does stores a value
not specifically only todos"

function useLocalStorageState<Data>(key: string, defaultValue: Data): Data {}

then you can do:

const initialTodos = useLocalStorageState<Todo[]>(....);
```

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

> This hook does \*\*\*\*\*

Write more here:

We have declared our types here, for easy export and usage within other components.

```javascript

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

## Would Context API be needed to avoid propdrilling in this scenario?



## Usage of useCallback

see the below chapters.

## Performance optimizing hooks 

see the following chapter here:

{% page-ref page="optimization.md" %}

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

