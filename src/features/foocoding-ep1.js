/****
    * imports below. should be ordered like:

    * 1. node package imports
    * 2. global feature imports
    * 3. local feature imports
*/

import { FEATURE } from '@forrestjs/hooks'

/****
    * Hooks specific variables
*/

// define a name for the feature
const FEATURE_NAME = `${FEATURE} foocoding-ep1`

// below we define variables that can be used in action listeners
const hooks = {
    FOOCODING_START: `${FEATURE_NAME}/foocodingStart`,
}

/****
    * register this file to the hook app.
    * below exported function can also be named "register"
*/

export default async ({ registerAction, registerHook }) => {
    /****
        * register actions
    */
    registerHook(hooks)

    /****
        * register action handlers
        * function reference: https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/register-action.js
    */

    // handle when FOOCODING_START fires
    registerAction({
        name: FEATURE_NAME,
        hook: '$FOOCODING_START',
        handler: (args, ctx) => {
            ctx.logger.info('**** fire foocoding-ep1 start ****')

            console.log(args)
            ctx.logger.info('********')
        },
    })

    // handle when app global action like START_FEATURE fires
    // for more global actions: https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/constants.js
    registerAction({
        name: FEATURE_NAME,
        hook: '$START_FEATURE',
        handler: (args, ctx) => {
            ctx.logger.info('**** message from foocoding-ep1 feature ****')

            // fire a new action
            // function reference: https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/create-hook.js
            ctx.createHook.serie(hooks.FOOCODING_START, {
                message: 'I got this now!',
                isStarted: true,
            })
        },
    })
}
