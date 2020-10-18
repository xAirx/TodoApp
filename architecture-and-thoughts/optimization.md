# DesignPrinciples

## Pure components & Functional Programming

**Increased Readability**

First, Functional Programming is often more readable because of its declarative nature.

In other words, the code is focused on describing the outcome of the computations, not the computations themselves.



> [Kyle Simpson](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch1.md/#chapter-1-why-functional-programming) phrases it like this:
>
> Declarative code is code that's more focused on describing the "what" outcome.
>
> Imperative code \(the opposite\) is focused on precisely instructing the computer "how" to do something.
>
> Because we spend the vast majority of our time reading code \(around 80% of the time I guess\) and not writing it, readability is the first thing we should enhance in order to increase our efficiency when programming.

#### 

#### Pure Components do not depend or modify the state of variables outside their scope. 

#### These are the building blocks of Functional Programming.

#### The simplest way to deliver reusable code is through a pure function \(Components, Custom Hooks\), we know what is expected to go in and what comes out \( TypeScript is a winner here \)

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
* 
### Immutabillity

> Unchanging over time or unable to be changed. When data is immutable, its state cannot change after it’s created. If you want to change an immutable object, you can’t. Instead, you create a new object with the new value.

* Do not mutate the input, e.g., _Array.prototype.push\(\)_.
* Do not use \(changeable\) variables outside of the function’s scope.

Any data that cannot be changed is immutable.

An immutable value or object cannot be changed.

When there is an update, a new value is created in memory, leaving the old one untouched.

We can use immutable data structures check for a complex state change.

For example, if the state in your application is immutable, you can actually save all state objects in a single store with a state-management library like [Redux](https://redux.js.org/), enabling you to easily implement undo and redo functionality.

Don’t forget that we cannot change immutable data once it’s created.



### Benefits Of Immutable Data Structures

* They have no side effects.
* Immutable data objects are easy to create, test, and use.
* They help us to write logic that can be used to quickly check for up
* dates in state, without having to check the data over and over again.



**Reasons why immutability is important is how Reacts built in optimization works too.**

**Batching multiple state updates into a single update to prevent multiple re-renders.**

> When using the useState\(\) hook, more on hooks later, React will also bail out of a re-render caused by a state change if the new state value is equal, using Object.is\(\) for equality check, to the previous state value.
>
> This is not the case when using its class component equivalent setState\(\) as every call to it will cause a re-render, unless its new state value comes from a passed function that returned null.



**We need to avoid these side effects inside Pure Components.**

> **This makes the easy to test, simple to reason about, and functions that meet this description have all sorts of useful properties when it comes to optimization or refactoring.**
>
> **See the chapter on unit-testing for testing scenarios**

\*\*\*\*

**Conclusion**

when working with the Classbased variant, we can use Extends PureComponent, working with the function based approach we use useMemo, this achieves the same effect.

As for the shallow comparison issue that can arise with both, the above guidelines are important to avoid it.

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}

