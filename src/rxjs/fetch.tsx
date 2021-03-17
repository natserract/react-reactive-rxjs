import React, { Dispatch, SetStateAction } from 'react'
import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs'
import { delay, retry, retryWhen, tap } from 'rxjs/operators'

// Fetch as Observable
function get(api: string) {
    return new Observable(subscriber => {
        fetch(api)
            .then(response => response.json())
            .then((body) => {
                subscriber.next(body)
                subscriber.complete()
            })
            .catch((err) => subscriber.error(err))
    })
}

const API_URL = "https://jsonplaceholder.typicode.com/posts"

const Fetch = () => {
    const [state, setState] = React.useState<unknown>(null)

    React.useEffect(() => {
        get(API_URL)
        .pipe(
            // Retry akan berjalan jika error
            // Retry 2 kali ketika error
            retry(2),
            // Custom retry 
            // Be careful infinite loop
            // retryWhen(errors => {
            //     return errors.pipe(
            //         delay(1000),
            //         tap(err => console.error('error fetch', err)),

            //     )
            // })
        )
        .subscribe(
            val => setState(val),
            err => console.error(err),
            () => console.log('Fetch Completed')
        )
    }, [])

    return (
        <>
            {JSON.stringify(state)}
        </>
    )
}
export default Fetch