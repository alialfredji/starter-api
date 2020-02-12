
import { runHookApp } from '@forrestjs/hooks'
import * as state from './state'

require('es6-promise').polyfill()
require('isomorphic-fetch')

runHookApp({
    trace: true,
    services: state.services,
    features: state.features,
    settings: state.settings,
})
    .catch((err) => {
        console.log('*** BOOT: Fatal Error')
        console.log(err)
    })
