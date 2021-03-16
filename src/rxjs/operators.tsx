import React, { Dispatch, SetStateAction } from 'react'
import { BehaviorSubject, Subject, Observable, of } from 'rxjs'
// import {   } from 'rxjs/operators'

function useObsValue<T>(obs: Observable<T | any>) {
    const [value, setValue] = React.useState(null)

    React.useEffect(() => {
        obs.subscribe(v => {
            console.log('useObsValue', v)
            setValue(v)
        })
    }, [obs])

    return value
}

const Operators = () => {
    // Of operator
    // Membuat sebuah nilai observable, secara berurutan
    const [ofState] = React.useState(of([1, 2, 3]))
    const v = useObsValue(ofState)

    return (
        <>
            { JSON.stringify(v) }
            <p>Hello</p>
        </>
    )
}

export default Operators