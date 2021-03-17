import React from 'react'
import { BehaviorSubject, Subject, ReplaySubject, forkJoin, of  } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { useSubjectValue } from '../utils'

const Subjects = () => {
    // Behaviour Subject/BS
    // BS has initial Value
    // BS return subscription value (jika di subscribe mengembalikan value)
    const [behaviourSubject] = React.useState(new BehaviorSubject<string>(''))
    const [value, obs$] = useSubjectValue(behaviourSubject)

    const handleChangeBehaviourSubject = React.useCallback((e) => {
        behaviourSubject.next(e.target.value)
    }, [behaviourSubject])

    
    // Replay Subject
    // Emit/Mengembalikan prev value ke subscription yang baru
    // ReplaySubject initial value berupa number, artinya akan mereplay jarak previousnya 1 langkah
    // Misal: 1, 2, 3, 4, 5 -> jika subscribe nya di langkah 3 dan replaySubjectnya 1, maka return valuenya 2, 3, 4, 5
    // Kalau replaySubjectnya 2 ya: 1, 2, 3, 4, 5
    const [replaySubject] = React.useState(new ReplaySubject<number>(1))

    React.useEffect(() => {
        //Subject/S
        // S hanya trigger .next(). (jika di subscribe, tidak return value)
        // If you want to use rxjs operators, use pipe() first and combine all op
        // Subject() hasn't parameter initial value not like BehaviorSubject(), use startWith()
        // Subject() hanya menerima nilai sebelumnya
        const subject = new Subject()
        subject.pipe(startWith("Alfin")).subscribe({
            next: (t) => console.log('->', t),

            // Complete, selesai. Next subscription tidak dilanjutkan
            complete: () => console.log('Complete')
        })
        subject.subscribe({
            next: (a) => console.log('first step', a),
        })
        subject.subscribe({
            next: () => console.log('second step'),
        })
        subject.next()
        subject.complete()

        // Value as observable
        obs$.subscribe(t => console.log('Value as observable: ', t))

        return () => subject.unsubscribe()
    }, [obs$])

    React.useEffect(() => {
        // Replay Subject
        replaySubject.next(1)
        replaySubject.next(2)
        replaySubject.next(3)
        replaySubject.subscribe(console.log)
        replaySubject.next(4)
        replaySubject.next(5)


        // forkJoin
        // Combine semua observer, menjadi sebuah single value object, 
        // be like combineReducers() in Redux
        const obs1$ = of(1)
        const obs2$ = of(2)
        const obs3$ = of(3)

        forkJoin({
            obs1$, 
            obs2$, 
            obs3$
        }).subscribe((v) => console.log('forkJoinValues', v))

    }, [replaySubject])

    return (
        <>
            <input
                type="text"
                onChange={handleChangeBehaviourSubject}
                value={value}
                name="behaviourSubjectInput"
            />
        </>
    )
}

export default Subjects