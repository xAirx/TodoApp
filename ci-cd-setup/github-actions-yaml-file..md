# Github Actions yaml file.

## Debugging issue:

```javascript
Run git push --force ***git.heroku.com/todoapp--$ENVIRONMENT.git origin/$BRANCH:master
error: The destination you provided is not a full refname (i.e.,
starting with "refs/"). We tried to guess what you meant by:

- Looking for a ref that matches 'master' on the remote side.
- Checking if the <src> being pushed ('refs/remotes/origin/development')
  is a ref in "refs/{heads,tags}/". If so we add a corresponding
  refs/{heads,tags}/ prefix on the remote side.

Neither worked, so we gave up. You must fully qualify the ref.
hint: The <src> part of the refspec is a commit object.
hint: Did you mean to create a new branch by pushing to
hint: 'refs/remotes/origin/development:refs/heads/master'?
error: failed to push some refs to 'https://git.heroku.com/todoapp--dev.git'
Error: Process completed with exit code 1.
```

#### Figuring out what head is set to

![](../.gitbook/assets/image%20%288%29.png)

#### Remotes were missing

![](../.gitbook/assets/image%20%2812%29.png)

![](../.gitbook/assets/image%20%289%29.png)

#### Check releases

![](../.gitbook/assets/image%20%2810%29.png)

#### Getting closer

![](../.gitbook/assets/image%20%2811%29.png)

#### Adding correct line to yaml file: after testing it in the console with API key.

```javascript
    run: git push --force https://heroku:$HEROKU_API_KEY
    @git.heroku.com/todoapp--$ENVIRONMENT.git HEAD:refs/heads/$BRANCH
```

## Full file:

```
name: Push Container to Heroku

on:
  push:
    branches:
      - development
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    if: github.event_name == 'push' && (github.ref == 'refs/heads/master' || github.ref == 'refs/heads/development')
    env:
      HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      SKIP_PREFLIGHT_CHECK : true

    steps:
      - uses: actions/checkout@v1
      - name: Login to Heroku Container registry
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: heroku container:login
      - name: Install Dependencies - yarn install
        run: yarn install
      - name: Unit tests - yarn test
        run: yarn test

      - name: Set Dev Environment
        if: github.ref == 'refs/heads/development'
        uses: allenevans/set-env@v1.0.0
        with:
          ENVIRONMENT: "dev"
          BRANCH: "development"

      - name: Printdevenv
        if: github.ref == 'refs/heads/development'
        run: |
          echo "ENVIRONMENT=${ENVIRONMENT}"
          printenv
      - name: Printdevbranchenv
        if: github.ref == 'refs/heads/development'
        run: |
          echo "BRANCH=${BRANCH}"
          printenv
      - name: Set Production Environment
        if: github.ref == 'refs/heads/master'
        uses: allenevans/set-env@v1.0.0
        with:
          ENVIRONMENT: "master"
          BRANCH: "master"

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

        run: git push --force https://heroku:$HEROKU_API_KEY@git.heroku.com/todoapp--$ENVIRONMENT.git HEAD:refs/heads/$BRANCH
```

