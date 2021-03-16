import React, { Dispatch, SetStateAction } from 'react'
import { BehaviorSubject, Subject, Observable, ReplaySubject } from 'rxjs'

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
        get(API_URL).subscribe(v => {
            setState(v)
        })
    }, [])

    return (
        <>
            {JSON.stringify(state)}
        </>
    )
}
export default Fetch