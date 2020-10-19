/* eslint-disable no-undef */
import React from 'react';
import { screen, render } from '@testing-library/react';
import { TodoForm } from './TodoForm';

describe('<Component />', () => {
	it('works', () => {
		render(<TodoForm />);

		expect(screen.getByText('Try it out and add a new todo!')).not.toBeNull();
	});
});
