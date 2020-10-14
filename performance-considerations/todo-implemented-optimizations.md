# TODO: Implemented optimizations



```text
//////// Will be refactored to GRAPHQL USE EFFECT GRABBING DATA.
/* basically on initial load
    check for localStorage
      if there is a value
      retrieve it
    validate it
    put it into state
      if no value, put null into state
    then in useEffect
     check what you have in state
     if something is there, no api request required
       if nothing is there, do the request
     in a separate useEffect, sync the changed state to localStorage
     and to backend if you want
```

\*/

