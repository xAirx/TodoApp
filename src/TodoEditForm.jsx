/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/* import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText'; */
import { makeStyles } from '@material-ui/core/styles';
import useInputState from './Hooks/useInputState';

function EditTodoForm({
  id, editTodo, task, toggleEditForm,
}) {
  const [value, HandleChange, reset] = useInputState(task);
  const [isError, setError] = useState(false);

  const useStyles = makeStyles((theme) => ({
    textfield: {
      textAlign: 'center',
      width: '500px',
    },
    formpaper: {
      /* root: { */
      /*   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', */
      border: 0,
      borderRadius: 3,
      /* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
      /* color: 'white', */
      /* height: 48, */
      /*  padding: '0 30px', */
      /*       height: , */
      /* padding: theme.spacing(2), */
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: '1rem 0',
      padding: '0 1rem',

      /* } */
    },
    button: {
      padding: '15px',
    },
  }));

  /*   const CheckError = () => {
    value === '' ? setError(true) : setError(false);
    editTodo(id, value);
  };
 */
  const classes = useStyles();
  /// // works but eslint hates it ? /////
  /*  const {...todos} = props.todos; */
  /// Correct way ///

  return (

    <Paper className={classes.formpaper} variant="outlined" square elevation={3}>
      <form
        Validate
        onSubmit={(e) => {
          e.preventDefault();
          // addtodo is passed from MUIAPP.jsx, we use it to set the new todo.
          /*  CheckError(); */
          editTodo(id, value);
          reset();
          toggleEditForm();
        }}
      >

        <TextField
          fullwidth
          label="You are editing this todo"
/*               required
              className={classes.textfield}
          /* margin="normal" */
          /* label={task} */
          className={classes.textfield}
          required
          value={value}
          onChange={HandleChange}
        />
        {/*  ) } */}
        <Button className={classes.button} type="submit">Submit</Button>
      </form>

    </Paper>

  );
}

export default EditTodoForm;
