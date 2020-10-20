# Designprinciples

## Clean code is DRY

DRY is an acronym that stands for “Don’t Repeat Yourself.” If you are doing the same thing in multiple places, consolidate the duplicate code. If you see patterns in your code, that is an indication it is prime for DRYing. 

Sometimes this means standing back from the screen until you can’t read the text and literally looking for patterns.

### Clean code is predictable and testable

### Clean code is self-commenting

### **Naming**

Functions should be named for what they do, not how they do it. In other words, don’t expose details of the implementation in the name. Why? Because how you do it may change some day, and you shouldn’t need to refactor your consuming code because of it.

## KISS & functional programming

**KISS** means **Keep It Simple Stupid** and it is a principle that says that _simple code design should be always preferred_. It is similar to the single responsibility principle that states: _Every function should have responsibility over a single part of the functionality._ One function should do one thing.

**Functional programming** helps you to write **easily testable and highly reusable functions**. It breaks your code into small simple pieces that you can compose into more and more powerful pieces.

## Inversion of control and dependency injection?

It is easy to build code with tight dependencies and a mix of concerns that lead to solutions that are hard to cover with test and debug.

Functional programming helps you avoid that.

Commonly you would load a module in your function or class to implement your functionality.

Inversion of control turns that around so that your functions are designed to be executed in other modules.

Dependency injection is a type of inversion of control.

Dependency is an external code that your function is dependent on, and injection is the act of providing it to your function.

## Pure Functions & Functional Programming

**Increased Readability**

First, Functional Programming is often more readable because of its declarative nature.

In other words, the code is focused on describing the outcome of the computations, not the computations themselves.

Well designed functional code can be surprisingly easy to make super performant. We are building code based on [pure functions](https://www.7urtle.com/javascript-functional-programming-basics#lambda-Pure-functions). Pure functions always provide the same output for the same input.

 [Composition](https://www.7urtle.com/javascript-functional-programming-basics#lambda-Function-composition) is just many of these functions in a line and therefore the input at the beginning again returns the same output.

You can use this functional purity by leveraging caching mechanisms for Memoization.



> [Kyle Simpson](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch1.md/#chapter-1-why-functional-programming) phrases it like this:
>
> Declarative code is code that's more focused on describing the "what" outcome.
>
> Imperative code \(the opposite\) is focused on precisely instructing the computer "how" to do something.
>
> Because we spend the vast majority of our time reading code \(around 80% of the time I guess\) and not writing it, readability is the first thing we should enhance in order to increase our efficiency when programming.

#### 

### Pure Functions do not depend or modify the state of variables outside their scope. 

These are the building blocks of Functional Programming.

The simplest way to deliver reusable code is through a pure function \(Components, Custom Hooks\), we know what is expected to go in and what comes out \( TypeScript is a winner here \)

A pure function is a function where the return value is only determined by its input values, without observable side effects. 

### **Functions should not introduce side effects** <a id="046d"></a>

If the application updates certain data that is observable outside the called function, it can be considered a side effect introduced by the function. Here are a few scenarios:

* Modifying any external variable or object property
* Logging data to the console
* Writing Data to a file
* Writing data to the network
* Triggering any external process
* Calling any other functions with side-effects
* Making Asynchronous Data Calls

> **This makes the easy to test, simple to reason about, and functions that meet this description have all sorts of useful properties when it comes to optimization or refactoring.**

```javascript
function Greet({ name }) {
  const message = `Hello, ${name}!`; // Calculates output'

// Bad!
  document.title = 'Greetings page'; // Side-effect!
  return <div>{message}</div>;       // Calculates output
}

```

### Immutability

> Unchanging over time or unable to be changed. When data is immutable, its state cannot change after it’s created. If you want to change an immutable object, you can’t. Instead, you create a new object with the new value.

* Do not mutate the input, e.g., _Array.prototype.push\(\)_.
* Do not use \(changeable\) variables outside of the function’s scope.
* Any data that cannot be changed is immutable.
* An immutable value or object cannot be changed.
* When there is an update, a new value is created in memory, leaving the old one untouched.

#### Advantages: 

Firstly react favors immutability because of its nature, props are the main blocks of the application and these have to be stored in state, and compared from time to time. comparing across renders would be very hard if we were not working with immutable data structures.

* We can use immutable data structures check for a complex state change.
* For example, if the state in your application is immutable, you can actually save all state objects in a
* Single store with a state-management library like [Redux](https://redux.js.org/), 
* Enabling you to easily implement undo and redo functionality for example
* Don’t forget that we cannot change immutable data once it’s created.

### Benefits Of Immutable Data Structures

* They have no side effects.
* Immutable data objects are easy to create, test, and use.
* They help us to write logic that can be used to quickly check for up
* dates in state, without having to check the data over and over again.

> **See the chapter on unit-testing for testing scenarios**

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

{% page-ref page="../unittesting/overview-of-unittests.md" %}



