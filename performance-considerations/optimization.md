# TODO: Introduction to Optimization

## Pure components & Functional Programming

> Pure Components do not depend or modify the state of variables outside their scope. These are the building blocks of Functional Programming.

The simplest way to deliver reusable code is through a pure function.

A pure function is a function where the return value is only determined by its input values, without observable side effects. Some common things to avoid:

* Do not mutate the input, e.g., _Array.prototype.push\(\)_.
* Do not use \(changeable\) variables outside of the function’s scope.



### **Functions should not introduce side effects** <a id="046d"></a>

If the application updates certain data that is observable outside the called function, it can be considered a side effect introduced by the function. Here are a few scenarios:

* Modifying any external variable or object property
* Logging data to the console
* Writing Data to a file
* Writing data to the network
* Triggering any external process
* Calling any other functions with side-effects
* Making Asynchronous Data Calls

We need to avoid these side effects inside Pure Components.

## Pure components in React

**Features of React Pure Components**

* Prevents re-rendering of Component if props or state is the same
* Takes care of “shouldComponentUpdate” implicitly
* State and Props are Shallow Compared
* Pure Components are more performant in certain cases

Similar to Pure Functions in JavaScript, a React component is considered a Pure Component if it renders the same output for the same state and props value.

 React provides the `PureComponent` base class for these class components.

 Class components that extend the `React.PureComponent` class are treated as pure components.

It is the same as Component except that Pure Components take care of `shouldComponentUpdate` by itself, it does the _shallow comparison_ on the state and props data. If the previous state and props data is the same as the next props or state, the component is not Re-rendered.



**React Components re-renders in the following scenarios:**

1. “setState” is called in Component
2. “props” values are updated
3. `this.forceUpdate()` is called

In the case of Pure Components, the React components do not re-render blindly without considering the updated values of React “props” and “state”. If updated values are the same as previous values, render is not triggered.

## UseMemo

## Lazy & Suspense

## useReducer

