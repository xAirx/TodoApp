/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';

// if there is nothing in localStorage under the key we will use the defaultVal.
function UseLocalStorageState(key, defaultVal) {
  /*
Make a piece of state but initialize it to some piece of local storage and
 by the way whenever it changes make sure you update local storage as well and then
 return that piece of state and a function to set

that piece of state. */

  const [state, setState] = useState(() => {
    let val;
    try {
      // See if there is something in localStorage with val...
      val = JSON.parse(
        window.localStorage.getItem(key) || String(defaultVal),
      );
    } catch (e) {
      /// if there is nothing in localStorage set val to defaultVal
      val = defaultVal;
    }
    return val;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}
/*
The last thing to do is return something from our hook so our hook needs
to return both the state and
a way of setting that state.

So we'll just do return state and set state so from the other side of
'things when we use this hook we

would just do something like this:

const [todos, setTodos] = useLocalStorageStatet("todos", []):

concept to use comma set to DOS equals use local storage state of
to do is never give it an initial value like an array.

And from our end of things we would use this code used to dos and set to
lose just like they came right
back from use state.

The only change is that we intercepted it.

We base the value in the state the initial value based off of local
storage and we have this use effect

that is listening for a change on to dos and will automatically sync with local storage.
 */

export default UseLocalStorageState;
