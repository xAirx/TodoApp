import { ChangeEvent, useState } from 'react';

export const useInputState = (initialVal: any) => {
	// call useState, "reserve a piece of state";

	const [state, setState] = useState(initialVal);

	const update = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setState(e.target.value);
	};

	/*  const change = () => {
	  setState('testxxx');
	};
	*/

	const reset = () => {
		setState('');
	};

	return [state, reset, update];
};
