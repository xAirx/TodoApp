# Material UI

## Examples of usage within the project:

[Using `useEffect()`](https://reactjs.org/docs/hooks-effect.html) from the [Hooks API for lifecycle methods](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes).   
  
This allows you to still use `makeStyles()` without classbased - lifecycle Methods [without adding the complication of making Higher-Order Components](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components). 

Which is much simpler.

```javascript
const useStyles = makeStyles(() => ({
		root: {
			flexGrow: 1,
		},

		menuButton: {
			marginRight: themeConfig.spacing(2),
		},

		toolbar: {
			/*  minHeight: 128, */
			/* alignItems: 'flex-center', */
			/*  paddingTop: themeConfig.spacing(1), */
			/* paddingBottom: themeConfig.spacing(3), */
			background: themeConfig.palette.background.paper,
			boxShadow: '0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0)',

		},

		title: {
			alignSelf: 'center',
			flexGrow: 1,
		},

		muipapermain: {

			background: themeConfig.palette.background.paper,
			/* root: { */
			/* background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', */
			border: 0,
			borderRadius: 3,
			/* boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', */
			/* color: 'white', */
			/* height: 48, */
			/*  padding: '0 30px', */
			height: '100vh',
			padding: themeConfig.spacing(2),
			textAlign: 'center'
			/* } */
		},
	}));
```

### Applying styles to "components"

```javascript
<Paper
		className={classes.muipapermain}
					variant="outlined"
					square
					elevation={3}
>
```

## GlobalStyles

Here we use the styled components variant of global styles as the MUI alternative can in my own opinon be harder to implement.

```javascript
export const GlobalStyle = createGlobalStyle`
	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	body {
		align-items: center;
		font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
		height: 100vh;
		margin: 0;
		padding: 0;
		transition: all 0.25s linear;
	}
`;
```

## Theme Wrapper

Here we have our custom ThemeWrapper function, this is created to abstract some of the code away from the app component itself for a more clean structure.

We have the Globalstyle as referenced above and the CSS-Baseline, which gives us a CSS reset lke normalize.css

```javascript
function ThemeWrapper(children: any, theme: any) {
	console.log('THIS IS THEME INSIDE THEMEWRAPPER', theme);
	return (
		<>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<CssBaseline />
				{children}
			</ThemeProvider>
		</>
	);
}
export default ThemeWrapper;

```

## Dark and Light mode + Theming

I decided to write a custom dark and light mode that still works wonderfully with MUI, normally you would have one constant named theme, which handles both light and dark mode using the palette.type property.

I wanted more control over the specific themes and not only changing the palette values as seen below:

> ### Dark mode
>
> Material-UI comes with two palette types, light \(the default\) and dark. You can make the theme dark by setting `type: 'dark'`. While it's only a single property value change, internally it modifies several palette values. - [https://material-ui.com/customization/palette](https://material-ui.com/customization/palette/)

I wanted to add a preferred theme functionality, along with more control over specific styling on the background of the light and dark theme.

#### `Example` Dark Theme.

```javascript

const darkTheme: ThemeOptions = {
	palette: {
		primary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		secondary: {
			dark: '#FFFFFF',

			light: '#FFFFFF',

			main: '#FFFFFF',
		},
		type: 'dark',
		background: {
			paper: 'linear-gradient(130deg, #0c2623 80%, #96bb7c 10%)',
		},
	},
};

```

####  Custom Hook - useColorMode function.

this function enables me to set the initial preferred  "thememode" from the user, this is done using Material UI's useMediaQueryHook.

Here we have a localStorage functionality, along with a toggle scenario.

```javascript
const trySyncToLocalStorage = (theme: Theme) => {
	try {
		localStorage.setItem(lskey, theme);
	} catch {
		// ignore
	}
};

const tryRetrievingFromLocalStorage = (theme: Theme): Theme => {
	try {
		const stored = localStorage.getItem(lskey);

		return stored ? JSON.parse(stored) : theme;
	} catch {
		return theme;
	}
};
```

```javascript

export const useColorMode = (): UseColorModeReturn => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	
	const initialRenderRef = useRef(true);

	const [colorMode, setColorMode] = useState<ColorMode>(
		tryRetrievingFromLocalStorage(prefersDarkMode ? 'dark' : 'light'),
	);

	useEffect(() => {
		
		if (initialRenderRef.current) {
			initialRenderRef.current = false;
		} else {
			
			setColorMode(prefersDarkMode ? 'dark' : 'light');
		}
	}, [prefersDarkMode]);

	useEffect(() => {

		trySyncToLocalStorage(colorMode);
	}, [colorMode]);

	const toggleColorMode = useCallback(() => {
		
		setColorMode(mode => (mode === 'dark' ? 'light' : 'dark'));
	}, []);

	
	return useMemo(() => ({ colorMode, toggleColorMode }), [
		colorMode,
		toggleColorMode,
	]);
};
```

```javascript
export const useTheme = () => {
	const { colorMode } = useColorMode();

	return useMemo(
	
		// based on the currently selected color mode, return a theme

		() => createMuiTheme(colorMode === 'dark' ? darkTheme : lightTheme),
		[colorMode],
	);
};
```

To read about the performance optimizations implemented  in detail read below:

{% page-ref page="../performance-considerations/todo-implemented-optimizations.md" %}



#### Usage in the app file

We import the needed functions and add them to constants which we use in our app \(home component\)

```javascript
import {
	ThemeWrapper, useColorMode, useTheme,
} from './index';
	
	const theme = useTheme();
	
	// destructuring toggleColorMode
	//useColorMode returns an object
		//const colorModeObj = useColorMode();
		//const toggleColorMode = colorModeObj.toggleColorMode;
		
	const { toggleColorMode } = useColorMode();
```

#### Toggle functionality

The toggle functionality is achieved calling the toggleColorMode function, which is inside our custom hook.

```javascript
<FormControlLabel
  label={theme.palette.type === 'dark' ? 'Too Dark?' : 'Too Bright?'}
  checked={theme.palette.type === 'dark'}
  control={<Switch onClick={toggleColorMode} />}
/>
```

## Extra

Quite a lot is happening in a small amount of code:

* We pass our `theme`, which we defined earlier, into the `makeStyles` function
* We define style objects \(root, media, and title\), which we can access later
* We access default and custom variables using our theme \(theme.spacing is a [default value](https://material-ui.com/customization/default-theme/)\)

**Note:** when defining styles we write a style object, similar to adding [an inline style](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822) to a React element`style={{ height: '100px' }}`

Finally, inside of our component, we can call our style hook, allowing us to apply the styles as a className:

```javascript
const classes = useStyles()
```

Material-UI Next also works with [SSR](https://material-ui-next.com/guides/server-rendering/), if you’re into that. Besides, although it comes with JSS out of the box, it can me made to work with just about any [other library](https://material-ui-next.com/guides/interoperability/), like Styled Components, or even raw CSS.

