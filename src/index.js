/* eslint-disable no-unused-vars */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MUIApp from './MUIthemeExample/MUIApp';


ReactDOM.render(
	<React.StrictMode>
		{/*     <VanillaThemingApp /> */}
		<MUIApp />
		{/* <StyledThemingApp/> */}
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWAxxxx
serviceWorker.unregister();
