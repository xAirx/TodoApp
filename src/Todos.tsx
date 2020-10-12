/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { ListItemIcon } from '@material-ui/core';
import EditTodoForm from './TodoEditForm';
import useToggleState from './Hooks/useToggleState';

export default function Todo({
	id, task, completed, toggleTodo, removeTodo, editTodo,
}) {
	/*   const [isToggled, toggleEdit] = useState(false);
  
	const editToggle = () => {
	  const toggled = !isToggled;
	  toggleEdit(toggled);
	};
   */
	const [isEditing, toggle] = useToggleState(false);

	console.log(id);
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
						<ListItemText style={{ textDecoration: completed ? "line-through" : "none" }}>
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
								<EditIcon onClick={() => toggle()} />
							</IconButton>
						</ListItemSecondaryAction>
					</>
				)}
		</ListItem>
	);
}
