# Using the CI/CD setup

## The Setup

The setup consists of a couple parts:

The Github actions YAML file

* Production and Development branch on Github.
* The Github actions YAML file
* Recognizing the Github branch in the YAML file via github.ref
* Using it conditionally to push to the correct Heroku instance
* Heroku CI/CD connected to each branch \(one for each\)
* MARS-CRA buildpak installed on each Heroku instance

This file will make sure that we are connecting and pushing to Heroku, here we specify our secret, which is our Heroku API key.



## Development and Production

```yaml
$ git add . 
$ git commit -m "Pushing to dev"
-------- Prehooks run now ------
-------- Unit testing runs now -----
$ "Successfully committed"
```

### Husky Prehook

```bash
"husky": {
		"hooks": {
			"pre-commit": "npm-run-all --parallel lintfix stylelintfix",
			"pre-push": "yarn run lint"
		}
	},
```

#### Example of stylelint being angry

```bash
src/sass/main.scss
  1:1  ✖  Selector should be written in lowercase with hyphens   selector-class-pattern
  5:1  ✖  Selector should be written in lowercase with hyphens   selector-class-pattern
 11:2  ✖  Selector should be written in lowercase with hyphens   selector-class-pattern
 16:1  ✖  Selector should be written in lowercase with hyphens   selector-class-pattern
 19:9  ✖  Unexpected named color "white"                         color-named           
 27:1  ✖  Selector should be written in lowercase with hyphens   selector-class-pattern

error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
ERROR: "stylelintfix" exited with 2.
husky > pre-commit hook failed (add --no-verify to bypass)
➜  GraphQLTodoApp git:(development) ✗ git add .                                                                                      
➜  GraphQLTodoApp git:(development) ✗ git commit -m "setup githubactions,eslint,tsconfig,husky and tooling + webpack bundle analyzer"
```

#### Example of eslint / tslint being angry

```bash
/Users/marcowurtz/Documents/GitHub/GraphQLTodoApp/GraphQLTodoApp/src/Todos.tsx
   3:17  error    'useState' is defined but never used                  @typescript-eslint/no-unused-vars
   3:27  error    'useEffect' is defined but never used                 @typescript-eslint/no-unused-vars
  11:10  error    'ListItemIcon' is defined but never used              @typescript-eslint/no-unused-vars     
  19:1   error    Trailing spaces not allowed                           no-trailing-spaces
  38:6   error    Expected indentation of 4 tab characters but found 5  react/jsx-indent
  40:58  warning  Strings must use singlequote                          quotes
  40:58  error    Strings must use singlequote                          @typescript-eslint/quotes
  40:75  warning  Strings must use singlequote                          quotes
  40:75  error    Strings must use singlequote                          @typescript-eslint/quotes

/Users/marcowurtz/Documents/GitHub/GraphQLTodoApp/GraphQLTodoApp/src/index.tsx
  9:1  error  More than 1 blank line not allowed  no-multiple-empty-lines
```

### Unit-testing Example

```bash


```

#### If the Unit-testing passes our code is commited:

{% hint style="info" %}
The Github Actions file runs now, and will check the branch

It will check the following:
{% endhint %}

```bash
if: github.event_name == 'push' &&
 (github.ref == 'refs/heads/master'
 || github.ref == 'refs/heads/development')
```

#### The code is now pushed to Heroku which in return will build our project 

```bash
      - name: Printproductionenv
        if: github.ref == 'refs/heads/master'
        run: |
          echo "ENVIRONMENT=${ENVIRONMENT}"
          printenv
      - name: Printprodbranchenv
        if: github.ref == 'refs/heads/master'
        run: |
          echo "BRANCH=${BRANCH}"
          printenv
      - name: Push to Heroku

        run: git push --force https://heroku:$HEROKU_API_KEY@git.heroku.com/todoapp--$ENVIRONMENT.git origin/$BRANCH:master
```

## You can see the container builds at either Dev or Production here:

Dev: [https://dashboard.heroku.com/apps/fullstacktodoapp--dev](https://dashboard.heroku.com/apps/fullstacktodoapp--dev)

Production: [https://dashboard.heroku.com/apps/fullstacktodoapp--master](https://dashboard.heroku.com/apps/fullstacktodoapp--master)

