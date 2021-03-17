// Good for reads: https://devzilla.io/manage-rxjs-subscriptions-in-angular/

import Subjects from './subjects'
import Operators from './operators'
import Fetch from './fetch'

const RxJsApp = () => {
    return (
        <>
            <Subjects />
            <Operators />
            <Fetch />
        </>
    )
}

export default RxJsApp