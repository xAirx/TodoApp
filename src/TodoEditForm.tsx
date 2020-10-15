import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useInputState } from './Hooks/useInputState';
import { EditTodoHandler } from './Hooks/useTodoState';

interface IEditTodo {
	id: string,
	editTodo: EditTodoHandler
	task: string,
	toggleEditForm: () => void,
}

const useStyles = makeStyles(theme => ({
	textfield: {
		textAlign: 'center',
		width: '500px',
	},

	formpaper: {
		/* root: { */
		/*   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', */
		border: 0,
		borderRadius: 3,
		color: theme.palette.text.secondary,
		margin: '1rem 0',
		padding: '0 1rem',
		/* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
		/* color: 'white', */
		/* height: 48, */
		/*  padding: '0 30px', */
		/*       height: , */
		/* padding: theme.sacing(2), */
		textAlign: 'center',

		/* } */
	},

	button: {
		padding: '15px',
	},
}));

export const EditTodoForm: React.FC<IEditTodo> = ({
	id, editTodo, task, toggleEditForm,
}) => {
	const [value, update, reset] = useInputState(task);
	/* const [isError, setError] = useState(false); */

	/*   const CheckError = () => {
	  value === '' ? setError(true) : setError(false);
	  editTodo(id, value);
	};
   */
	const classes = useStyles();

	return (

		<Paper className={classes.formpaper} variant="outlined" square elevation={3}>
			<form
				onSubmit={e => {
					e.preventDefault();
					// addtodo is passed from MUIAPP.jsx, we use it to set the new todo.
					/*  CheckError(); */
					editTodo(id, value);
					reset();
					toggleEditForm();
				}}
			>

				<TextField
					label="You are editing this todo"
					required
					className={classes.textfield}
					margin="normal"
					value={value}
					onChange={() => update}
				/>
				<Button className={classes.button} type="submit">Submit</Button>
			</form>

		</Paper>

	);
};
