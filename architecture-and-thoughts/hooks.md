# Hooks

## Custom Hooks

### **useInputState**

{% hint style="info" %}
This custom hook enables me to reset a state for a formfield and also gives the abillity to update the formfield with an event such as e.target.value.
{% endhint %}

```bash
import { useState } from 'react';

function useUpdate(initialVal = 'testdata') {
  // call useState, "reserve a piece of state";

  const [state, setState] = useState(initialVal);

  const update = (e) => {
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

export default useUpdate;

```

### Example Usage with form:

```bash
function Todoform({ addTodo }) {
	const [value, update, reset] = useInputState('');
```

```bash
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

### useLocalStorageState

This hook was created to be able to easily store our todos in localstorage, so that when the user logs in or out the data is persisted and we can cut down on graphQL calls.

{% code title="" %}
```bash
# Ain't no code for that yet, sorry
echo 'You got to trust me on this, I saved the world'
```
{% endcode %}



