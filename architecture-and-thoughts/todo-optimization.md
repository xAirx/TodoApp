---
description: Hooks im using in my project.
---

# TODO: Hooks & Optimization

> React enables web applications to update their user interfaces \(UIs\) quickly, but that does not mean your medium or large React application will perform efficiently.

> Its performance will depend on how you use React when building it, and on your understanding of how React operates and the process through which components live through the various phases of their life-cycle.

> React offers a lot of performance improvements to a web app, and you can achieve these improvements through various techniques, features, and tools.

## TODO REWRITE: Why do we need optimizations?

React rendering & problems with it.

{% tabs %}
{% tab title="TLDR" %}
Since React renders "Reactively" based on state, passing props and more , its important to be able to control renders throughout larger projects for performance reasons.

Parent components will trigger child component re-renders, and diffing on previous  props and next props can trigger  renders which we forexample want to happen when specific props changes or,  passed props to a function.
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



## TODO REWRITE: Controlling when a component should update

MyTheme.TSX which includes the useColorMode Hook, and useTodoState which includes the useTodos hook.

Apparent issues a re-render will happen regardless if props have changed or not, when it comes to child components.

## TODO REWRITE: useMemo and useCallback

useCallback\(\) and useMemo\(\) are React hooks that return memoized functions and values, respectively.

> An optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

## TODO REWRITE: useEffect\(sideEffect management\)

Removes the need for componentDidMount , componentDidUpdate and componentWillUnmount because it handles the use case of all of these life cycle methods.

#### useEffect will work like a componentDidMount

#### useEffect\(callback, dependencies\) is the hook that manages the side-effects in functional components.

Any kind of side effect is not allowed inside the render method \(or inside the function in case of a functional component\). So any kind of side effect should be used inside useEffect

callback argument is the function invoked after changes are committed to the screen: here is where you put the side-effect logic.

The function passed to useEffect will run after the render is committed to the screen.

Whatever function we return from the useEffect will be treated as componentWillUnmount

By default, effects run after every completed render, but you can choose to fire them [only when certain values have changed](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).

If we pass an empty array our useEffect will only run once throughout the life of our component \(our eslint will be complaining a lot though\)

dependencies is a list of dependencies of your side-effect: being props or state values.

## TODO REWRITE: useRef 

The useRef hook allows you to create a persistent ref to a DOM node, or really to any value.

React will persist this value between re-renders \(between calls to your component function\).

We need this because we can’t just store things in local variables – they’d go out of scope as soon as the component function returns \(React components are really just functions, remember\).

Calling useRef creates an empty ref object by default, or you can initialize it to some other value by passing an argument.



## TODO  REWRITE: UseMemo\(Memoize values\)

Unlike useEffect, `React.useMemo` does not trigger every time you change one of its dependencies.

A memoized function will first check to see if the dependencies have changed since the last render. If so, it executes the function and returns the result. If false, it simply returns the cached result from the last execution.

This is good for expensive operations like transforming API data or doing major calculations that you don't want to be re-doing unnecessarily

## TODO REWRITE: UseCallback \(Memoize functions\)

This is a special case for memoizing functions. Since javascript compares equality by reference, the function you create the first time a component renders will be different than the one created in subsequent renders.

If you try passing a function as props or state, this means that it will be treated as a prop change every single time. By wrapping it in useCallback, React will know that it's the same function. You can still add a dependency array to trigger a recalculation if the dependencies change.

A strong use-case here to avoid child component re-renders

