import React from 'react'

import '_app/styles/theme.scss'

const App: React.FunctionComponent = () => {
    React.useEffect(() => {
        console.log('%c' + 
            '\nWelcome to create-react-iqwik template!', 'font-size: 25px;', 
            '\n\n🤝 Contribute to template: https://github.com/iqwik/create-react-iqwik',
            '\n🔎 Author website, visit: https://iqwik.ru\n\n',
        )
    }, [])

    return (
        <div>
            <h1>It&apos;s works!!!</h1>
        </div>
    )
}

export default React.memo(App)
