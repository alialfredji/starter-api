
import * as hooks from './hooks'

/****
    * register this file to the hook app.
    * below exported function can also be named "register"
*/

export default async ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: hooks.FEATURE_NAME,
        hook: '$FOOCODING_EP2',
        handler: (args, ctx) => {
            ctx.logger.info('**** message from foocoding-ep3 feature ****')
            ctx.logger.info('handling action from foocoding-ep2')
            console.log(args)
        },
    })
}
