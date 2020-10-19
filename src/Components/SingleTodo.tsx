import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { EditTodoForm } from './TodoEditForm';
import { useToggle } from '../Hooks/useToggleState';
import { RemoveTodoHandler, EditTodoHandler, ToggleTodoHandler } from '../Hooks/useTodoState';

interface ITodo {
	removeTodo: RemoveTodoHandler,
	toggleTodo: ToggleTodoHandler,
	editTodo: EditTodoHandler,
	id: string,
	task: string,
	completed: boolean,

}

export const SingleTodo: React.FC<ITodo> = (
	{
		id, task, completed, toggleTodo, removeTodo, editTodo,
	},
) => {
	const [isEditing, toggle] = useToggle(false);

	/* console.log(id); */
	return (
		<ListItem>
			{isEditing ? (
				<EditTodoForm
					toggleEditForm={toggle}
					id={id}
					task={task}
					editTodo={editTodo}
				/>
			) : (
					<>
						<Checkbox tabIndex={-1} checked={completed} onClick={() => toggleTodo(id)} />
						<ListItemText style={{ textDecoration: completed ? "line-through'" : 'none' }}>
							{task}
							{completed}
							{/* {id} */}
						</ListItemText>
						<ListItemText>
							{/* {isToggled ? <EditTodoForm id={id} task={task} editTodo={editTodo} /> : ''} */}
						</ListItemText>
						<ListItemSecondaryAction>

							<IconButton aria-label="Delete">
								<DeleteIcon onClick={() => removeTodo(id)} />
							</IconButton>

							<IconButton aria-label="Edit">
								{/*               <EditIcon onClick={() => editToggle()} /> */}
								<EditIcon onClick={toggle} />
							</IconButton>
						</ListItemSecondaryAction>
					</>
				)}
		</ListItem>
	);
};
