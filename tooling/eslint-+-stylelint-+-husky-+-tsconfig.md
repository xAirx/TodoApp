# Eslint & Husky & TSConfig

## Setup and Overview



### Package Scripts 

```css
"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject",
		"lint": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
		"lintfix": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
		"stats": "react-scripts build \"--stats\" && webpack-bundle-analyzer build/bundle-stats.json"
	},
```

### Husky Pre-Hooks

```css
husky": {
		"hooks": {
			"pre-commit": "npm-run-all --parallel lintfix",
			"pre-push": "yarn run lint"
		}
	},
```

### .eslintrc

```css
{
	"env": {
		"browser": true,
		"node": true
		/*  "es2020": true */
	},
	"extends": [
		"plugin:react/recommended",
		"airbnb",
		/* "eslint:recommended"',
		"plugin:@typescript-eslint/recommended" */
		"airbnb-typescript"
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"react",
		"react-hooks",
		"@typescript-eslint"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 11,
		"sourceType": "module",
		"project": "./tsconfig.json"
	},
	"rules": {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"import/prefer-default-export": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				"vars": "all",
				"args": "after-used",
				"ignoreRestSiblings": false
			}
		],
		"@typescript-eslint/explicit-function-return-type": "off", // Consider using explicit annotations for object literals and function return types even when they can be inferred.
		"no-empty": "warn",
		"import/extensions": [
			"off",
			"ignorePackages",
			{
				"ts": "never",
				"tsx": "never"
			}
		],
		"react/jsx-indent": [
			0,
			"tab"
		],
		"react/jsx-indent-props": [
			0
		],
		/* "indent": "off", */
		"@typescript-eslint/indent": [
			0,
			"error"
		],
		"space-in-parens": [
			0,
			"always"
		],
		"computed-property-spacing": [
			2,
			"always"
		],
		"no-multiple-empty-lines": [
			2,
			{
				"max": 1,
				"maxEOF": 0,
				"maxBOF": 0
			}
		],
		"quotes": [
			1,
			"single",
			"avoid-escape"
		],
		"no-use-before-define": [
			0,
			{
				"functions": false
			}
		],
		"semi": [
			0,
			"never"
		],
		"prefer-const": 1,
		"react/prefer-es6-class": 0,
		"react/prop-types": [
			0
		],
		"react/no-array-index-key": [
			1
		],
		"class-methods-use-this": [
			1
		],
		"no-undef": [
			1
		],
		"no-case-declarations": [
			1
		],
		"no-return-assign": [
			1
		],
		"no-param-reassign": [
			1
		],
		"no-shadow": [
			1
		],
		"camelcase": [
			1
		],
		"no-underscore-dangle": [
			0,
			"always"
		],
		"indent": [
			0,
			"tab"
		],
		"no-tabs": 0,
		/* 	"allowIndentationTabs": 2, */
		"import/newline-after-import": [
			"error",
			{
				"count": 1
			}
		],
		"no-console": 0,
		"func-names": 1,
		"space-before-function-paren": 1,
		"comma-dangle": 1,
		"max-len": 0,
		"radix": 0,
		"arrow-parens": [
			2,
			"as-needed"
		],
		"function-paren-newline": [
			"error",
			"consistent"
		],
		"react/jsx-filename-extension": [
			0,
			{
				"extensions": [
					".js",
					".jsx"
				]
			}
		],
		"react/prefer-stateless-function": "off",
		"no-plusplus": [
			"error",
			{
				"allowForLoopAfterthoughts": true
			}
		]
	}
}
```

### tsconfig.json

```css
{
  "compilerOptions": {
    "jsx": "react",
    "target": "es6",
    "module": "esnext",
    "lib": [
      "dom",
      "es6",
      "dom.iterable",
      "scripthost"
    ],
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "noEmitOnError": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "allowJs": true,
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": [
    "./src"
  ],
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "jspm_packages": true,
    "node_modules": true
  }
}

```

