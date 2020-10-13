# Eslint + StyleLint + Husky + TSConfig

## Setup and Overview

### Husky Pre-hooks

```bash
"husky": {
		"hooks": {
			"pre-commit": "npm-run-all --parallel lintfix stylelintfix",
			"pre-push": "yarn run lint"
		}
	},
```

### Eslint and Stylelint Scripts

```bash
"lint": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
		"lintfix": "eslint \"{src,test}/**/*.{js,jsx,ts,tsx}\"",
		"stylelintfix": "npx stylelint '**/*.scss' --fix",
```

### .eslintrc

```bash
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
			2,
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
			2,
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
			1
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

```bash
{
	"compilerOptions": {
		"jsx": "react",
		/* Basic Options */
		"target": "es6", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
		"module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
		"lib": [
			"dom", // making dom available.
			"es6",
			"dom.iterable",
			"scripthost"
		], /* Specify library files to be included in the compilation. */
		// "allowJs": true,                       /* Allow javascript files to be compiled. */
		// "checkJs": true,                       /* Report errors in .js files. */
		// "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
		// "declaration": true,                   /* Generates corresponding '.d.ts' file. */
		// "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
		// "sourceMap": true,                     /* Generates corresponding '.map' file. */
		// "outFile": "./",                       /* Concatenate and emit output to single file. */
		"outDir": "./dist", /* Redirect output structure to the directory. */
		"rootDir": "./src", /* Specify the root directory of input files. Use to control the output directory structure with --outDir.
		// "composite": true,                     /* Enable project compilation */
		"removeComments": true, /* Do not emit comments to output. */
		// "noEmit": true,                        /* Do not emit outputs. */
		// "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
		// "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
		// "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
		"noEmitOnError": true,
		/* Strict Type-Checking Options */
		"strict": true, /* Enable all strict type-checking options. */
		// "noImplicitAny": false,                 /* Raise error on expressions and declarations with an implied 'any' type. */
		// "strictNullChecks": true,              /* Enable strict null checks. */
		// "strictFunctionTypes": true,           /* Enable strict checking of function types. */
		// "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
		// "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
		// "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
		// "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
		/* Additional Checks */
		"noUnusedLocals": true, /* Report errors on unused locals. */
		"noUnusedParameters": true, /* Report errors on unused parameters. */
		"noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
		// "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
		/* Module Resolution Options */
		// "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
		// "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
		// "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
		// "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
		// "typeRoots": [],                       /* List of folders to include type definitions from. */
		// "types": [],                           /* Type declaration files to be included in compilation. */
		// "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
		"esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
		// "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
		/* Source Map Options */
		// "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
		// "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
		// "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
		// "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
		/* Experimental Options */
		// "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
		// "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
	},
	// I will only compile whatever is inside the source folder:
	"include": [
		"src"
	],
	"files.exclude": {
		"**/.git": true,
		"**/.DS_Store": true,
		"jspm_packages": true,
		"node_modules": true
	}
}
```

