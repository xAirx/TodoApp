import React, { useState } from 'react';

export const useInputState = (initialVal: string) => {
	// call useState, "reserve a piece of state";

	const [value, setState] = useState(initialVal);

	const update = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setState(e.target.value);
	};

	/*  const change = () => {
	  setState('testxxx');
	};
	*/

	const reset = () => {
		setState('');
	};

	return { value, reset, update };
};
