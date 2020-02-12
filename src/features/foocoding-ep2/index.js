
import * as hooks from './hooks'

/****
    * register this file to the hook app.
    * below exported function can also be named "register"
*/

export default async ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: hooks.FEATURE_NAME,
        hook: '$INIT_FEATURE',
        handler: (args, ctx) => {
            ctx.logger.info('**** message from foocoding-ep2 feature ****')

            ctx.createHook.serie(hooks.FOOCODING_EP2, {
                message: 'this is ep2, need more work',
                isReady: false,
            })
        },
    })
}
