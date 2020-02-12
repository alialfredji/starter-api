
/****
    build app state
*/

export const services = [
    require('@forrestjs/service-env'),
    require('@forrestjs/service-logger'),
    require('@forrestjs/service-express'),
    require('@forrestjs/service-express-graphql'),
    require('@forrestjs/service-postgres'),
]

export const features = [
    // require('./features/foocoding-ep1'),
    // require('./features/foocoding-ep2'),
    // require('./features/foocoding-ep3'),
]

/****
    build app settings & variables
*/

export const settings = async ({ setConfig, getEnv, getConfig }) => {
    // apply postgres databases to connect to
    setConfig('postgres.connections', [])
}

