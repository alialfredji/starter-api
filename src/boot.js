
import { createHookApp } from '@forrestjs/hooks'
import * as state from './state'

require('es6-promise').polyfill()
require('isomorphic-fetch')

export default createHookApp({
    trace: true,
    services: state.services,
    features: state.features,
    settings: state.settings,
})
