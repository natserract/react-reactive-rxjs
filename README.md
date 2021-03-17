# Reactive: Do RxJS in React

Are you love reactive programming?

> RxJS is a library for composing asynchronous and event-based programs by using observable sequences - RxJS

## What is Subscription?
To understand what is a Subscription, we need to first understand several terminologies in RxJS.

### Observable

According to RxJS docs, [Observable](https://rxjs-dev.firebaseapp.com/api/index/class/Observable) is a representation of any set of values over any amount of time.
`Observable` has `subscribe()` method, which invokes execution of an `Observable` and registers [Observer](https://rxjs-dev.firebaseapp.com/guide/observer) handlers for notifications it will emit.

### Subscription

Now that we understand `Observable` and `subscribe()` method, now we are ready to talk about [Subscriptions](https://rxjs-dev.firebaseapp.com/guide/subscription). In a nutshell, a Subscription:
- Is a disposable resource, usually the execution of an Observable (allowing value to be streamed out of observable)
- Has one important method, unsubscribe(), which disposes of the resource held by the Subscription


## Avalaible Script:
You can run:
```sh 
yarn start
```

## Learn More

To learn RxJS, check out the [RxJS documentation](https://www.learnrxjs.io/).
