import React from 'react';
import {
	createMuiTheme,
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
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
	ThemeWrapper, useDarkmode, darkTheme, lightTheme,
} from './index';
import { TodoList } from '../TodoList';
import TodoForm from '../TodoForm';
import { useTodos } from '../../Hooks/useTodoState';

export const HomeComponent: React.FC = () => {
	/// //////////////////////////////////////////////////////////////
	/// ////////////////////Material UI Theming ///////////////////////////////
	/// //////////////////////////////////////////////////////////////

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const themeObject = React.useMemo(
		() => (prefersDarkMode ? darkTheme : lightTheme),
		// only run if prefersDarkMode has changed
		[prefersDarkMode],
	);
	/* const themeObject = prefersDarkMode ? darkTheme : lightTheme; */
	console.log(themeObject);
	const [theme, toggleDarkMode] = useDarkmode(themeObject);
	/* 	console.log('This is theme from app', theme);
		const themeConfig = createMuiTheme(theme);
	 */
	const themeConfig = React.useMemo(
		// Only run if theme has changed.
		() => createMuiTheme(theme), [theme],
	);
	const useStyles = makeStyles(() => ({
		root: {
			flexGrow: 1,
		},

		menuButton: {
			marginRight: themeConfig.spacing(2),
		},

		toolbar: {
			background: themeConfig.palette.background.paper,
			boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',

		},

		title: {
			alignSelf: 'center',
			flexGrow: 1,
		},

		muipapermain: {
			background: themeConfig.palette.background.paper,
			border: 0,
			borderRadius: 3,
			height: '100vh',
			padding: themeConfig.spacing(2),
			textAlign: 'center',
		},
	}));
	const classes = useStyles();
	const initialTodos = [{ id: '1', task: 'Get started writing your own todos here!', completed: false }];
	/// ////////////////////////////////////////////////////////////////////////
	/// ///////////////////////////////////////////////////////////////////////

	const {
		todos, addTodo, removeTodo, toggleTodo, editTodo,
	} = useTodos(initialTodos);

	return (
		<ThemeWrapper theme={themeConfig}>
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
								{themeConfig.palette.type === 'dark'
									? <Brightness4Icon />
									: <Brightness7Icon />}
							</Typography>

							<FormControlLabel
								label={themeConfig.palette.type === 'dark' ? 'Too Dark?' : 'Too Bright?'}
								checked={themeConfig.palette.type === 'dark'}
								control={<Switch onClick={toggleDarkMode} />}
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
						<Grid item xs={11} md={8} lg={4}>
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
