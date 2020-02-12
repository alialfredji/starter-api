
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
    require('./features/example-hooks-ep1'),
    require('./features/example-hooks-ep2'),
    require('./features/example-hooks-ep3'),
    require('./features/example-express-ep1'),
    require('./features/example-express-graphql-ep1'),
]

/****
    build app settings & variables
*/

export const settings = async ({ setConfig, getEnv, getConfig }) => {
    // apply postgres databases to connect to
    setConfig('postgres.connections', [])
}

