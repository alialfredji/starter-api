
/****
    build app state
*/

export const services = [
    require('@forrestjs/service-env'),
    require('@forrestjs/service-logger'),
    require('@forrestjs/service-express'),
    require('@forrestjs/service-express-graphql'),
    // require('@forrestjs/service-postgres'),
]

export const features = [
    // require('./features/examples/hooks-ep1'),
    // require('./features/examples/hooks-ep2'),
    // require('./features/examples/hooks-ep3'),
    // require('./features/examples/express-ep1'),
    // require('./features/examples/express-graphql-ep1'),
    // require('./features/examples/example-feature-file'),
    // require('./features/__myfirstfeature'),
]

/****
    build app settings & variables
*/

export const settings = async ({ setConfig, getEnv, getConfig }) => {
    // apply postgres databases to connect to
    setConfig('postgres.connections', [])
}

