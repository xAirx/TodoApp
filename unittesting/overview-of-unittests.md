# Overview of Unittests

## **What is reuseable code?**



**Reliability**

To be reused, code needs to be reliable. You can ensure reliable code by ensuring availability, fault tolerance, and recoverability.

**Performance Efficiency**

To be reused, code needs to be efficient. You can ensure efficiency by improving response times and monitoring processor, memory, and utilization.

**Maintainability**

Testable and code is easier to maintain.

## Installation

To be reused, code needs to be maintainable. One way to ensure that code is maintainable is to ensure it is compliant.

#### Adding packages

```javascript
yarn add -D jest @testing-library/react 
@testing-library/user-event 
@testing-library/jest-dom @testing-library/react-hooks
```

#### Adding our Test Script.

```javascript
yarn add -D ts-jest
```

#### Adding Jest to Package.JSON \( REMOVED BECAUSE OF CRA\)

```javascript
"jest": {
		"collectCoverageFrom": [
			"(pages|src)/**/*.{js,jsx,ts,tsx}"
		],
		"transform": {
			"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
			"^.+\\.css$": "<rootDir>/scripts/jest/cssTransform.js"
		},
		"transformIgnorePatterns": [
			"/node_modules/",
			"^.+\\.module\\.(css|sass|scss)$"
		],
		"moduleNameMapper": {
			"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
		},
		"clearMocks": true,
		"restoreMocks": true,
		"resetMocks": true
	},
```

```javascript
	"scripts": {
		"test": "jest",
		}
```

#### cssTransform.js \(scripts/jest\)

```javascript
module.exports = {
	getCacheKey() {
		return 'cssTransform';
	},
	process() {
		return 'module.exports = {};';
	},
};

```

#### setupTests.js \(Toplevel\)

```javascript
require('@testing-library/jest-dom/extend-expect');

```

## Setting up a simple test.

#### Todoform.test.tsx

```javascript
import React from 'react';
import { screen, render } from '@testing-library/react';
import { TodoForm } from './TodoForm';

describe('<Component />', () => {
	it('works', () => {
		render(<TodoForm />);

		expect(screen.getByText('Try it out and add a new todo!')).not.toBeNull();
	});
});

```



