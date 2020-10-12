import { useState } from 'react';

function useToggle(initialVal = false) {
  // call useState, "reserve a piece of state";

  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
}
export default useToggle;
