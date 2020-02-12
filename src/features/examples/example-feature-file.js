import { FEATURE } from '@forrestjs/hooks'
import { GraphQLString } from 'graphql'

const FEATURE_NAME = `${FEATURE} feature-file`

const hooks = {
    EXAMPLE_CONSTANT: `${FEATURE_NAME}/exampleConstant`,
}

export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: FEATURE_NAME,
        hook: '$INIT_FEATURE',
        handler: (args, ctx) => {
            ctx.createHook.serie(hooks.EXAMPLE_CONSTANT, {
                message: 'my first hook',
                isReady: true,
            })
        },
    })

    // registerAction({
    //     name: FEATURE_NAME,
    //     hook: '$EXAMPLE_CONSTANT',
    //     handler: (args) => {
    //         console.log(args)
    //     },
    // })

    registerAction({
        name: FEATURE_NAME,
        hook: '$EXPRESS_ROUTE',
        handler: ({ registerRoute }) => {
            const routeHandler = (req, res) => {
                res.send('I love this')
            }

            registerRoute.get('/foo', routeHandler)
        },
    })

    registerAction({
        name: FEATURE_NAME,
        hook: '$EXPRESS_GRAPHQL',
        handler: ({ registerQuery, registerMutation }) => {
            const queryObject = {
                description: 'I am playing around',
                args: {
                    message: { type: GraphQLString },
                },
                type: GraphQLString,
                resolve: (_, args, { req, res }) => {
                    return args.message || 'hello world'
                },
            }

            const mutationObject = {
                description: 'I am playing around with mutations',
                args: {
                    message: { type: GraphQLString },
                },
                type: GraphQLString,
                resolve: (_, args, { req, res }) => {
                    return args.message || 'hello world'
                },
            }

            registerQuery('exampleQuery', queryObject)
            registerMutation('exampleMutation', mutationObject)
        },
    })
}
