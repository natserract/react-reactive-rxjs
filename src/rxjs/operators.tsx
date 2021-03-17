import React from 'react'
import { of, fromEvent, interval, BehaviorSubject } from 'rxjs'
import { mergeMap, concatMap, switchMap, tap, debounceTime, filter, take, takeWhile, takeUntil, retry } from 'rxjs/operators'
import { useObsValue, simulateHttp, get } from '../utils'

const API_URL = "https://jsonplaceholder.typicode.com/posts"

const Operators = () => {
    // Of operator
    // Membuat sebuah nilai observable, secara berurutan
    const [ofState] = React.useState(of([1, 2, 3]))
    const v = useObsValue(ofState)

    React.useEffect(() => {
        // map, mergeMap, switchMap, forkJoin, etc. This better solution, for subscription hell,
        // Eg:  _one$.subscribe(() => _two$.subscribe(() =>  _three$.subscribe(...))
        // map -> pemetaan

        // Observer cold: menampikan satu nilai

        // mergeMap/flatMap
        // Menggabungkan semua stream/aliran/proses satu ke aliran/proses lainnya
        // Berjalan secara async paralel/bersamaan
        const implMergeMap = () => {
            const http = simulateHttp("1", 2000)
            const http2 = simulateHttp("2", 1000)
            const http3 = simulateHttp("3", 1000)

            const results = http.pipe(
                mergeMap((t) => {
                    console.log('mergeMap http1', t)
                    // Inner observable
                    return http2
                }),
            )

            results.subscribe(
                (v) => console.log('mergeMap1 next to http2', v)
            )
        }


        // switchMap
        // Dimana ketika berlanggan yang baru, maka observer lama di unsubscribe/berhenti (switch to new observer)
        // Aliran sebelumnya ditidak pedulikan, hanya yang baru
        const implSwitchMap = () => {
            const http = simulateHttp("1", 1000)
            const http2 = simulateHttp("2", 500)

            const results = http.pipe(
                switchMap(t => {
                    console.log('switchMap http1', t)
                    return http2
                }),
            )

            results.subscribe(
                (v) => console.log('switchMap next to http2', v)
            )
        }

        // Concat map -> berurutan, async serial. Menunggu aliran satu selesai, baru lanjut ke stream lainnya
        const implConcatMap = () => {
            const http = simulateHttp("1", 1000)
            const http2 = simulateHttp("2", 500)

            const results = http.pipe(
                concatMap(t => {
                    console.log('concatMap http1', t)
                    return http2
                }),
            )

            results.subscribe(
                (v) => console.log('concatMap next to http2', v)
            )
        }

        // take()
        const implTake = () => {
            // take: ngambil beberapa item saja (1 misal), setelah itu di unsubscribe (automatic)
            const takeVal$ = of(1, 2, 3, 4)
            takeVal$
                .pipe(
                    take(1)
                )
                .subscribe(v => console.log('takeValue', v))

            // takeWhile: ngambil beberapa item, tapi dengan condition. Kalau take, number
            // Bedanya dengan filter, takeWhile yg dicek adalah value dan lengthnya
            // See: https://www.learnrxjs.io/learn-rxjs/operators/filtering/takewhile#examples
            const takeWhileVal$ = of(1, 2, 3, 3);
            takeWhileVal$
                .pipe(takeWhile((v) => v <= 4)) // output: 1, 2 ,3
                .subscribe(v => console.log('takeWhileValue', v))
        }

        implMergeMap()
        implSwitchMap()
        implConcatMap()
        implTake()

        const subscribeMe = new BehaviorSubject('')

        // Manual unsubscribe
        return () => subscribeMe.unsubscribe()

    }, [])


    const handleChange = React.useCallback((e) => {
        // fromEvent: Watch event as a observable
        const event$ = fromEvent(e.target, 'keyup')

        event$.pipe(
            // tap()
            // Biasanya untuk debugging/logging
            tap({
                next: (v) => console.log('tap next', v),
            }),
            // debounceTime: delay selama 400ms setelah keyup terakhir
            debounceTime(400),
            // filter: filter value jika lengthnya > 5
            filter((ev: any) => {
                const val = ev.target.value
                return val.length > 5
            }),
            switchMap((ev: any) => {
                return get(API_URL)
            }),

        ).subscribe(
            succ => console.log(succ),
            err => console.error(err)
        )
    }, [])

    return (
        <>
            <p>Hello</p>
            <input type="text" onChange={handleChange} />
        </>
    )
}

export default Operators