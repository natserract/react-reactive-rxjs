import React from 'react'
import {  retry, retryWhen } from 'rxjs/operators'
import { get } from '../utils'

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