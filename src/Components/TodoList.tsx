// eslint-disable-next-line no-use-before-define
import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { SingleTodo } from './SingleTodo';
import {
	RemoveTodoHandler, EditTodoHandler, ToggleTodoHandler, Todo,
} from '../Hooks/useTodoState';

interface ITodoList {
	editTodo: EditTodoHandler,
	removeTodo: RemoveTodoHandler,
	toggleTodo: ToggleTodoHandler,
	todos: Todo[]
}

const useStyles = makeStyles(theme => ({
	muipaper: {
		border: 0,
		borderRadius: 3,
		boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',
		padding: theme.spacing(2),
		textAlign: 'center',
	},
}));

export const TodoList: React.FC<ITodoList> = ({
	todos, removeTodo, toggleTodo, editTodo,
}) => {
	// here we are overwriting everything in setTodos, we are going to pass in the existing todos
	// and then we will concatenate a new object.

	const classes = useStyles();

	return (

		<>
			<Paper className={classes.muipaper} variant="outlined" square elevation={3}>
				<List>
					{todos.map((todo, i) => (
						<>
							<SingleTodo
								key={todo.id}
								id={todo.id}
								task={todo.task}
								completed={todo.completed}
								toggleTodo={toggleTodo}
								editTodo={editTodo}
								removeTodo={removeTodo}
							/>
							{i < todos.length - 1 && <Divider />}
						</>
					))}
				</List>
			</Paper>
		</>
	);
	/* return null; */
};
