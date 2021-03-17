import React from 'react'
import { BehaviorSubject, Subject, Observable, of } from 'rxjs'
import { delay } from 'rxjs/operators'

export function useObsValue<T>(obs: Observable<T | any>) {
    const [value, setValue] = React.useState(null)

    React.useEffect(() => {
        obs.subscribe(v => {
            console.log('useObsValue', v)
            setValue(v)
        })
    }, [obs])

    return value
}

// Fetch as Observable
export function get(api: string) {
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

export function simulateHttp(val: any, timing: number) {
    return of(val).pipe(delay(timing))
}

export function useSubjectValue(o: BehaviorSubject<any> | Subject<any>): readonly [string, Observable<any>] {
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        o.subscribe(v => setValue(v))

        // return () => o.unsubscribe()
    }, [o])

    return [value, o.asObservable()] as const
}
