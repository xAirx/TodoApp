# TODO: Implemented optimizations

> React enables web applications to update their user interfaces \(UIs\) quickly, but that does not mean your medium or large React application will perform efficiently.

> Its performance will depend on how you use React when building it, and on your understanding of how React operates and the process through which components live through the various phases of their life-cycle.

> React offers a lot of performance improvements to a web app, and you can achieve these improvements through various techniques, features, and tools.

## Themeconfig

Thought process

Optimizations

Composition patterns used

Alternative solutions

## UseTodoState hook

### useCallback\(\) Hook

> The useCallback\(\) hook returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

### useMemo\(\) Hook

> `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

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

## Thought process

> #### Structure of your components <a id="structure-of-your-components"></a>
>
> An even better way of improving re-renders is by restructuring your code a little bit.
>
> Be careful where you place your logic. If you put everything in the root component of your application, all the `React.memo` functions in the world won't help you to fix your performance problems.
>
> If you place it closer to where the data is used, chances are you don't even need `React.memo`.

**code that handles the state into a seperate component**:



#### Initial structure:

find old structure in a git commit



#### Improved Structure

Optimizations

Composition patterns used

Alternative solutions



