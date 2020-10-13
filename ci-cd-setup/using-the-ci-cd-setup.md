# Using the CI/CD setup

## The Setup

The setup consists of a couple parts:

The Github actions yaml file

* Production and Development branch on github.
* The Github actions yaml file
* Recognizing the Github branch in the yaml file via github.ref
* Using it conditionally to push to the correct heroku instance
* Heroku CI/CD connected to each branch \(one for each\)
* MARS-CRA buildpak installed on each heroku instance

This file will make sure that we are connecting and pushing to heroku, here we specify our secret, which is our Heroku API key.



#### Development and Production

```yaml
$ git add . 
$ git commit -m "Pushing to dev"
-------- Prehooks run now ------
-------- Unit testing runs now -----
$ "Successfully committed"
```

#### Husky Prehook

```bash
"husky": {
		"hooks": {
			"pre-commit": "npm-run-all --parallel lintfix stylelintfix",
			"pre-push": "yarn run lint"
		}
	},
```

#### Unittesting Example

```bash


```

### If the unittesting passes our code is commited:

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

        run: git push --force https://heroku:$HEROKU_API_KEY@git.heroku.com/fullstacktodoapp--$ENVIRONMENT.git origin/$BRANCH:master
```

You can see the container builds at either Dev or Production here:

Dev: [https://dashboard.heroku.com/apps/fullstacktodoapp--dev](https://dashboard.heroku.com/apps/fullstacktodoapp--dev)

Production: [https://dashboard.heroku.com/apps/fullstacktodoapp--master](https://dashboard.heroku.com/apps/fullstacktodoapp--master)

