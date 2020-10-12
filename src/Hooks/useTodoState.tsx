/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import uuid from 'uuid/v4';
import useLocalStorageState from './useLocalStorageState';

export default (initialTodos) => {
	// UselocalStorage state will initialize the state and make the state for us.
	// Bsed off of localstorage. we are using useLocalStorageState to make sure to handle the
	// Localstorage functionality here.
	const [todos, setTodos] = useLocalStorageState('todos', initialTodos);

	console.log('THESE ARE THE TODOS INSIDE USETODOSTATE HOOK', todos);

	return {
		todos,

		addTodo: (newTodoText) => {
			setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
		},
		removeTodo: (todoId) => {
			console.log('removetodocalled');
			// filter out removed todo
			const updatedTodos = todos.filter((todo) => todo.id !== todoId);
			console.log(updatedTodos);
			// call setTodos with new todosArray
			setTodos(updatedTodos);
			/* console.log('These are the updated todos', todos); */
		},
		editTodo: (todoId, newTodoText) => {
			console.log('editTodoCalled');
			// filter out removed todo
			/*  const updatedTodos = todos.filter((todo) => todo.id === todoId);
			   /*  console.log(updatedTodos); */
			/*  updatedTodos.task = newTodoText; */
			// call setTodos with new todosArray
			const updatedTodos = todos.map((todo) => (todo.id === todoId
				? { ...todo, task: newTodoText } : todo));
			console.log('this is the new todos changed from edit', updatedTodos);
			setTodos(updatedTodos);
			/* console.log('These are the updated todos', todos); */
		},

		toggleTodo: (todoId) => {
			const updatedTodos = todos.map((todo) => (todo.id === todoId ? {
				...todo,
				completed: !todo.completed,
			} : todo));
			setTodos(updatedTodos);
		},

	};
};

/* const addTodo = (newTodoText) => {
  setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
}; */

/// /////
/// /////

/* const removeTodo = (todoId) => {
  console.log('removetodocalled');
   filter out removed todo
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);
  console.log(updatedTodos);
   call setTodos with new todosArray
  setTodos(updatedTodos);
  console.log('These are the updated todos', todos);
};
 */
/// /////
/// /////

/* const editTodo = (todoId, newTodoText) => {
   console.log('editTodoCalled');
   filter out removed todo
   const updatedTodos = todos.filter((todo) => todo.id === todoId);
   console.log(updatedTodos);
   updatedTodos.task = newTodoText;
   call setTodos with new todosArray
  const updatedTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, task: newTodoText } : todo));
  console.log('this is the new todos changed from edit', updatedTodos);
  setTodos(updatedTodos);
  console.log('These are the updated todos', todos);
};
 */

/* const toggleTodo = (todoId) => {
	const updatedTodos = todos.map((todo) => (todo.id === todoId ? {
	  ...todo,
	  completed: !todo.completed,
	} : todo));
	setTodos(updatedTodos);
  };
 */
