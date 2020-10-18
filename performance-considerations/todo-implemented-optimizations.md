# TODO: Implemented optimizations

> React enables web applications to update their user interfaces \(UIs\) quickly, but that does not mean your medium or large React application will perform efficiently.

> Its performance will depend on how you use React when building it, and on your understanding of how React operates and the process through which components live through the various phases of their life-cycle.

> React offers a lot of performance improvements to a web app, and you can achieve these improvements through various techniques, features, and tools.

## TODO: Why do we need optimizations?

rendering & problems with it.

rendering process + parent -&gt; child  recursive render.

controlling when a component should update

useMemo and useCallback



## TODO:   Themeconfig

Thought process

Optimizations

Composition patterns used

Alternative solutions

## TODO: UseTodoState hook

### useCallback\(\) Hook

> The useCallback\(\) hook returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

Thought process

Optimizations

Composition patterns used

{% tabs %}
{% tab title="Old Structure" %}
```

```
{% endtab %}

{% tab title="Performance" %}
Performance 
{% endtab %}

{% tab title="New Structure" %}
> All functionality is in a single hook useTodoState.tsx

```javascript
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

## useColorMode hook

## Thought process

> #### Structure of your components <a id="structure-of-your-components"></a>
>
> An even better way of improving re-renders is by restructuring your code a little bit.
>
> Be careful where you place your logic. If you put everything in the root component of your application, all the `React.memo` functions in the world won't help you to fix your performance problems.
>
> If you place it closer to where the data is used, chances are you don't even need `React.memo`.

**code that handles the state into a Seperate component**:

#### 

{% tabs %}
{% tab title="Initial structure" %}
> Functionality is scattered across App Component and the useDarkModeHook
{% endtab %}

{% tab title="Performance" %}

{% endtab %}

{% tab title="Optimized structure" %}
> Everything is extracted into a single component a custom hook.

> Here naming is also improved.
>
> \*\*\*\*\*\*\*\*\*

```text

```
{% endtab %}

{% tab title="Performance increase" %}

{% endtab %}
{% endtabs %}

**Optimized  Structure**

Optimizations



Alternative solutions



