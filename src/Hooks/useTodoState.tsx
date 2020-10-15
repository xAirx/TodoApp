import { useCallback, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export type AddTodoHandler = (value: string) => void;
export type RemoveTodoHandler = (id: string) => void;
export type EditTodoHandler = (id: string, value: string) => void;
export type ToggleTodoHandler = (id: string) => void;
export type Todo = {
	id: string;
	task: string;
	completed: boolean;
};

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
