import React from 'react';
import ReactDOM from 'react-dom';
import { HomeComponent } from './Components/CoreComponents/Home';

ReactDOM.render(
	<React.StrictMode>
		{/*     <VanillaThemingApp /> */}
		<HomeComponent />
		{/* <StyledThemingApp/> */}
	</React.StrictMode>,
	document.getElementById('root'),
);
