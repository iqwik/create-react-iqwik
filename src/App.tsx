import * as React from 'react'

import '_app/styles/theme.scss'

const App: React.FunctionComponent = () => {
    React.useEffect(() => {
        /* eslint-disable-next-line no-console */
        console.log(
            '%c'
            + '\nWelcome to create-react-iqwik!',
            'font-size: 25px;',
            '\n\n🤝 Contribute to template: https://github.com/iqwik/create-react-iqwik',
            '\n🔎 Visit the author\'s homepage: https://github.com/iqwik\n\n',
        )
    }, [])

    return (
        <div>
            <h1>It&apos;s works!!!</h1>
        </div>
    )
}

export default React.memo(App)
