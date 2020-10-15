# TypeScript

## Why are we using TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript any browser, any host, and any open-source.

TypeScript also helps us to create JavaScript code cleaner

TypeScript is able to point out errors in compilation during development.

 It also supports JavaScript libraries and API documentation. In TypeScript, the same code can be run on any browser, device or operating system.

JavaScript code is TypeScript code. It can be converted into TypeScript just changing the extension of the file from “.js” to “.ts”.

## Usage of TSX

TSX allows for embedding JSX elements inside the file, and is largely used by React.

TS files are plain old Typescript files and do not support adding JSX Elements.

Typically you would seperate concerns by placing only code relating to presentation in the TSX files.



## Why I use TypeScript

####  Faster Development

more robust code will involve less bugfixing, so again it will mean saving time, typescript will yell at you before runtime.

####  Bugs reduction

 Typescript provides code compilation and types checking, which help to detect bugs for typos, names updating, types misusing,

####  Flexibility, compatibility and easy migration from JavaScript

 One of the biggest advantages if you are considering to migrate a legacy javascript project to typescript is the fact that typescript is really flexible and compatible with javascript. Typescript is highly configurable and you decide if you want to make it compatible with javascript and not require types.

**Browser compatibility**

 Typescript allows you to transpile javascript code which will be compatible with multiple browsers and versions. I know this can be also achieved with ECMA Script and babel, which is great, but in typescript you will have that out of the box.



## Example implementation

```javascript
interface EditTodo {
    id: number,
    editTodo: (id: number, value: any) => void,
    task: string,
    toggleEditForm: () => void,
}
```

```javascript

export const EditTodoForm: React.FC<EditTodo> = ({ id, editTodo, task, toggleEditForm }) => {
```

## OOP principles & Functional Design patterns



> **TypeScript introduces the abillity to implement OOP principles into the world of JS, since i am very into functional programming these principles are not applied here on this project itself.**
>
> \*\*\*\*

![](../.gitbook/assets/image%20%285%29.png)

![](../.gitbook/assets/image%20%286%29.png)

#### See the section on Pure **C**omponents and Optimization here:

{% page-ref page="optimization.md" %}



## **Disadvantages**

There's not really any downsides to be fair, the only annoying thing is that some libs don't have types, either included, or at all

#### 

