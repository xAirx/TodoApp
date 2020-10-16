# TODO: Implemented optimizations and Composition patterns

## Themeconfig

Thought process

Optimizations

Composition patterns used

Alternative solutions

## UseTodoState hook

Thought process

Optimizations

Composition patterns used

### Alternative solutions \(using an API to grab data\)

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

    // this is the alternative approach, youll find content about it if you search
    // for "optimistic ui"
  }, []);

  const optimisticAddTodo: AddTodoHandler = useCallback((task) => {
    // this is the alternative approach, youll find content about it if you search
    // for "optimistic ui"

    const newTodo = { completed: false, id: uuid(), task };

    setTodos((oldTodos) => oldTodos.concat(newTodo));

    // fire and forget approach. the ui was already updated above! we don't care
    // whether the request fails or not. we expect it not to, but its not relevant
    // for the direct continuation of the user flow. feels better, no waiting time!
    axios.post(endpoint, newTodo).catch((error) => {
      // do whatever you want here
    });
  }, []);
```

## UseDarkMode hook

Thought process

Optimizations

Composition patterns used

Alternative solutions



