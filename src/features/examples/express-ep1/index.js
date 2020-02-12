
import * as hooks from './hooks'
// import GraphQLJSON from 'graphql-type-json'

/****
    * register this file to the hook app.
    * below exported function can also be named "register"
*/

export default async ({ registerAction, registerHook }) => {
    registerHook(hooks)

    /****
     * express service usage reference:
     * https://github.com/forrestjs/forrestjs/tree/master/packages/service-express
     */
    registerAction({
        name: hooks.FEATURE_NAME,
        hook: '$EXPRESS_ROUTE',
        handler: ({ registerRoute }, ctx) => {
            const routeHandler = (req, res) => {
                res.send('Hello World')

                // do what ever you want below
            }

            // register route
            registerRoute.get('/', routeHandler)
        },
    })
}
