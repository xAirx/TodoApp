/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import '../css/style.css';
import {
	FormControlLabel, createMuiTheme, Switch,
	IconButton,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
/* import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import uuid from 'uuid/v4'; */
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { ThemeWrapper, useDarkmode } from './index';
import TodoList from '../TodoList';
import TodoForm from '../TodoForm';
import useTodoState from '../Hooks/useTodoState';
import useLocalStorageState from '../Hooks/useLocalStorageState';

export default function MUIapp() {
	/*   Users might have specified a preference for a light or dark theme.
	The method by which the user expresses their preference can vary.
	It might be a system-wide setting exposed by the Operating System,
	or a setting controlled by the User Agent.
  
	You can leverage this preference dynamically with the useMediaQuery
	hook and the prefers-color-scheme media query.
  
	For instance, you can enable the dark mode automatically: */

	const [theme, toggleDarkMode] = useDarkmode();
	console.log('THIS IS THEME INSIDE APP', theme);

	const themeConfig = createMuiTheme(theme);

	const useStyles = makeStyles(() => ({
		root: {
			flexGrow: 1,
		},

		menuButton: {
			marginRight: themeConfig.spacing(2),
		},
		toolbar: {
			/*  minHeight: 128, */
			/* alignItems: 'flex-center', */
			/*  paddingTop: themeConfig.spacing(1), */
			/* paddingBottom: themeConfig.spacing(3), */
			background: themeConfig.palette.background.paper,
			boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)',

		},
		title: {
			flexGrow: 1,
			alignSelf: 'center',
		},
		muipapermain: {
			/* root: { */
			/* background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', */
			border: 0,
			borderRadius: 3,
			/* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
			/* color: 'white', */
			/* height: 48, */
			/*  padding: '0 30px', */
			height: '100vh',
			padding: themeConfig.spacing(2),
			textAlign: 'center',

			background: themeConfig.palette.background.paper
			/* } */
		},
	}));

	const classes = useStyles();
	/// /////
	/// /////
	/// /////
	/// /////
	/// /////
	/// /////
	/// /////
	/// /////

	/* Now if we had another piece of state that we wanted distinct to local storage whenever it changed we
  would need to duplicate this code duplicate this code:
  
	// This required us to return null inside todolist else react will crash because TODOS isnt containing anything.
	/*   const initialTodos = JSON.parse(window.localStorage.getItem('todos')) || [""];
  
	/* Instead we could make a new hook a custom hook called use local storage state.
  
  And all we would do is pass in something like this.
  
	/// /////
	/// /////
  const [todos] = useLocalStorageState("todos", []);
	/// /////
	/// /////
  
  Use local storage state.
  We would give it a key.
  So in our case to dos and then a default value and we could pass in an array instead of the string of
  an array.
  
  So we pass in an array and then it's going to return to dos just like we have now.
  Something like that and maybe set to dos and then anytime we change to dos it will automatically sync
  to local storage.
  
  So that way we can move this code out move this code out.
  But also if we wanted to save anything to local storage and have it update or sync anytime that piece
  of State changed we could use that in this application in another application.
  
  It's a pretty common use case.
  So if we wanted to add in a dark mode or a light mode or a language preference like if a user could
  specify French instead of English we might want to store that in local storage but that doesn't really
  belong with the to dos in that array. You'd need a separate piece of state a separate piece of local storage so it would be best to use a
  
  custom hook. as seen below: useLocalStorageState.
   */

	/// /////
	/// /////

	const initialTodos = [{ id: 1, task: 'Get started writing your own todos here!', completed: false }];

	/*   = JSON.parse(window.localStorage.getItem('todos')) || [{ id: 1, task: 'Get started writing your own todos here!', completed: false }];
   */

	// We can easily set and initialize our state and localstorage like this:
	/*   const [mood, setMood] = useLocalStorageState('mood', 'happy');
	console.log(mood); */

	const {
		todos, addTodo, removeTodo, toggleTodo, editTodo,
	} = useTodoState(initialTodos);
	/// /////
	/// /////

	/*   const initialTodos = [
	  { id: 1, task: 'Buy Cucumber', completed: false },
	  { id: 2, task: 'Buy Eggs', completed: true },
	  { id: 3, task: 'Buy Bread', completed: false },
	];
   */

	return (
		<ThemeWrapper theme={themeConfig}>
			<div className={classes.root}>
				<AppBar position="static" color="transparent">
					<Toolbar className={classes.toolbar}>

						{/*     <IconButton aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton aria-label="display more actions" edge="end" color="inherit">
              <MoreVertIcon />
            </IconButton> */}

						<IconButton
							aria-label="light and dark mode toggle"
							edge="end"
							justify="center"
							color="inherit"
						>
							<Typography
								className={classes.title}
								style={{ marginRight: '20px', marginTop: '6px' }}
								noWrap
							>
								{themeConfig.palette.type === 'dark'
									? <Brightness4Icon variant="outlined" />
									: <Brightness7Icon />}
							</Typography>

							<FormControlLabel
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
						{/*             <button onClick={() => setMood('angry')}>Click to get angry and test localStorage</button>
 */}
					</Grid>
				</Paper>

			</div>
		</ThemeWrapper>
	);
}
