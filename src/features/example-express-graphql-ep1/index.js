
import * as hooks from './hooks'
import GraphQLJSON from 'graphql-type-json'

/****
    * register this file to the hook app.
    * below exported function can also be named "register"
*/

export default async ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: hooks.FEATURE_NAME,
        hook: '$EXPRESS_GRAPHQL',
        handler: (args, ctx) => {
            args.registerQuery('firstQuery', {
                type: GraphQLJSON,
                resolve: () => {
                    return 'firstQuery'
                },
            })

            args.registerMutation('firstMutation', {
                type: GraphQLJSON,
                resolve: () => {
                    return 'firstMutation'
                },
            })
        },
    })
}
