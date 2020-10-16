import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useInputState } from '../Hooks/useInputState';
import { AddTodoHandler } from '../Hooks/useTodoState';

interface ITodoForm {
	addTodo: AddTodoHandler
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
		boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',
		color: theme.palette.text.secondary,
		margin: '1rem 0',
		padding: '0 1rem',
		/* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
		/* color: 'white', */
		/* height: 48, */
		/*  padding: '0 30px', */
		/*       height: , */
		/* padding: theme.spacing(2), */
		textAlign: 'center',

		/* } */
	},

	button: {
		marginBottom: '25px',
		marginTop: '10px',
		padding: '15px',
	},
}));

export const Todoform: React.FC<ITodoForm> = ({ addTodo }) => {
	const { value, reset, update } = useInputState('');

	const classes = useStyles();

	return (

		<Paper className={classes.formpaper} variant="outlined" square elevation={3}>
			<form
				onSubmit={e => {
					e.preventDefault();
					addTodo(value);
					reset();
				}}
			>
				<TextField
					label="Try it out and add a new todo!"
					className={classes.textfield}
					margin="normal"
					required
					value={value}
					onChange={update}
				/>

				<Button className={classes.button} type="submit">Submit</Button>
			</form>

		</Paper>

	);
};

export default Todoform;
