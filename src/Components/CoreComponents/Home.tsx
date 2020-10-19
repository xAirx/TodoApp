import React from 'react';
import {
	FormControlLabel,
	IconButton, Switch,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import {
	ThemeWrapper, useColorMode, useTheme,
} from './index';
import { TodoList } from '../TodoList';
import TodoForm from '../TodoForm';
import { useTodos } from '../../Hooks/useTodoState';

export const HomeComponent: React.FC = () => {
	const { toggleColorMode, colorMode } = useColorMode();
	const theme = useTheme(colorMode);

	const useStyles = makeStyles(() => ({
		root: {
			flexGrow: 1,
		},

		menuButton: {
			marginRight: theme.spacing(2),
		},

		toolbar: {
			background: theme.palette.background.paper,
			boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',

		},

		title: {
			alignSelf: 'center',
			flexGrow: 1,
		},

		muipapermain: {
			background: theme.palette.background.paper,
			color: theme.palette.text.primary,
			border: 0,
			borderRadius: 3,
			height: '100vh',
			padding: theme.spacing(2),
			textAlign: 'center',
		},
	}));
	const classes = useStyles();

	/// ////////////////////////////////////////////////////////////////////////
	/// ///////////////////////////////////////////////////////////////////////

	const initialTodos = [{ id: '1', task: 'Get started writing your own todos here!', completed: false }];

	const {
		todos, addTodo, removeTodo, toggleTodo, editTodo,
	} = useTodos(initialTodos);

	return (
		<ThemeWrapper theme={theme}>
			<div className={classes.root}>
				<AppBar position="static" color="transparent">
					<Toolbar className={classes.toolbar}>
						<IconButton
							aria-label="light and dark mode toggle"
							edge="end"
							color="inherit"
						>
							<Typography
								className={classes.title}
								style={{
									marginRight: '20px',
									marginTop: '6px',
								}}
								noWrap
							>
								{theme.palette.type === 'dark'
									? <Brightness4Icon />
									: <Brightness7Icon />}
							</Typography>

							<FormControlLabel
								label={theme.palette.type === 'dark' ? 'Too Dark?' : 'Too Bright?'}
								checked={theme.palette.type === 'dark'}
								control={<Switch onClick={toggleColorMode} />}
							/>

						</IconButton>
					</Toolbar>
				</AppBar>

				<Paper
					className={classes.muipapermain}
					variant="outlined"
					square
					elevation={3}
				>
					<Grid container justify="center" style={{ marginTop: '1rem' }}>
						<Grid item xs={12} sm={10} md={10} lg={6}>
							<TodoList
								todos={todos}
								removeTodo={removeTodo}
								toggleTodo={toggleTodo}
								editTodo={editTodo}
							/>
							<TodoForm addTodo={addTodo} />
						</Grid>
					</Grid>
				</Paper>
			</div>
		</ThemeWrapper>
	);
};
