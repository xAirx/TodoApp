import { useState } from 'react';

function useUpdate(initialVal = 'testdata') {
  // call useState, "reserve a piece of state";

  const [state, setState] = useState(initialVal);

  const update = (e) => {
    setState(e.target.value);
  };

  /*  const change = () => {
    setState('testxxx');
  };
 */
  const reset = () => {
    setState('');
  };

  return [state, update, reset];
}

export default useUpdate;
