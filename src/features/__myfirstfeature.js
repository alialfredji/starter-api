import { FEATURE } from '@forrestjs/hooks'

const FEATURE_NAME = `${FEATURE} myfeaturename`

const hooks = {
    FIRST_FEATURE_CONSTANT: `${FEATURE_NAME}/exampleConstant`,
}

export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: FEATURE_NAME,
        hook: '$FIRST_FEATURE_CONSTANT',
        handler: (args, ctx) => {
            setTimeout(() => {
                ctx.logger.info('basic stuff')
            }, 2000)
        },
    })

    registerAction({
        name: FEATURE_NAME,
        hook: '$START_FEATURE',
        handler: (args, ctx) => {
            ctx.logger.info('WOOOW this is so cool')

            ctx.createHook.serie(hooks.FIRST_FEATURE_CONSTANT, {
                message: 'my first hook',
                isReady: true,
            })
        },
    })
}
