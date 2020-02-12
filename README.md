
#forrestjs #nodejs #express #graphql #postgressql #docker

`Simplicity & Abstraction is key. Think less about the tool, focus more on the logic`

## Getting Started

This project requests `node` to run the app.
For postgres database we need to have `docker` & `docker-compose` installed on your computer. If you dont use the database its not needed. The app starts without postgres integration to focus only on #nodejs #express #graphql #forrestjs

Install needed packages for the application & run development environment
```bash
    npm i && npm run start:dev

    OR

    yarn && yarn start:dev
```

## Project codebase

```bash                   
├── src
│   ├── features                # <---- app features, added to state. create your work here...
│   ├── boot.js                 # app boot file
│   ├── state.js                # <---- app state, link your features here
├── index.js                    # knows where to find project files when starting project
├── package.json                # knows how to start project
├── .env                        # constains app enironment variables
├── docker-compose.yml          # handle docker environment containers like postgres
└── Makefile                    # simple commands to run apps & containers
```

## Fast description of the project

`@forrestjs/hooks` is the package we use to initialize the application and build up the features.

`src/state.js` controls which features & services to run in the app & what settings to apply to it. By commenting out one of the features it wont be running.

the Boot log in the terminal will tell you what features & services are running now.

You also have an api running on `localhost:8080`. That is provided by the `@forrestjs/service-express` & `@forrestjs/service-express-graphql`. graphql gets accessed on `localhost:8080/api`.

All the above `@forrestjs` packages are npm packages that are installed in the project. Google them for more documentation.

## Creating a feature

Simple as it can get a feature is a function. That function will have logic on setting up the feature. We can start with creating a basic feature.

create a js file in `src/features` & call it `myfirstfeature.js`.
Export a basic function to start with
```js
export default () => {
    console.log('MY FIRST FEATURE')
}
```

link the feature in the app. `src/state.js` contains all the features and services linked to the app.
```js
export const features = [
    // all the features that exists,
    
    // my new feature
    require('./features/myfirstfeature.js'),
]
```

The result should be a `console.log` in our terminal saying `MY FIRST FEATURE`

```bash
MY FIRST FEATURE 
info: [express] server is running on 8080

=================
Boot Trace:
=================

→ env ◇ start
→ logger ◇ start
♦ app/settings ◇ settings
→ express ◇ init::service
  → express-graphql → express/middleware
→ express ◇ start::service
♦ app/trace ◇ finish
```

## @forrestjs/hooks constants & registerAction

If we search for `@forrestjs/hooks` on google we will find the npm package in the search results.
This package is the one setting up our application. It also export some constants that is needed to setup our own features. [@forrestjs/hooks package reference](https://www.npmjs.com/package/@forrestjs/hooks)
You can find all the constants here: [@forrestjs/hooks constants](https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/constants.js)

Its similiar to Redux actions. you define a constant. That constant can be fired somewhere in the app. All the action listeners that listen to that constant will fire. Let me show you an example of how its used.

From `@forrestjs/hooks` constants we can listen to `START_FEATURE`. In our feature function we register an action listener, we use `registerAction` to do that, [@forrestjs/hook registerAction function](https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/register-action.js). Lets pickup the feature we created above and implement that

```js 
export default ({ registerAction }) => {
    // console.log('MY FIRST FEATURE')
    
    registerAction({
        name: 'myfeaturename',
        hook: '$START_FEATURE',
        handler: (args, ctx) => {
            ctx.logger.info('WOOOW this is so cool')
        },
    })
}
```

The result in out terminal should be like

```bash
info: [express] server is running on 8080
info: WOOOW this is so cool

=================
Boot Trace:
=================

→ env ◇ start
→ logger ◇ start
♦ app/settings ◇ settings
→ express ◇ init::service
  → express-graphql → express/middleware
→ express ◇ start::service
myfeaturename ◇ start::feature
♦ app/trace ◇ finish
```

Notice:
`info: WOOOW this is so cool` that we logged
`myfeaturename ◇ start::feature` in the Boot Trace.

The Boot Trace is telling us that the feature name `myfeaturename` listened to the constant `START_FEATURE` and did something, the result was logging a message.

This is a demonstration of how to use the global hooks constants that is used at boot time. We can actually define our own constants and other features can listen to them.

## Create a constant & listen to it

`@forrestjs/hooks` package define its own constants that can be used at boot time, when the app first runs. Every feature we create can create its own constants for other features to listen to. Let me show you how that is constructed by using our previous example

```js 
import { FEATURE } from '@forrestjs/hooks'

const FEATURE_NAME = `${FEATURE} myfeaturename`

const hooks = {
    FIRST_FEATURE_CONSTANT: `${FEATURE_NAME}/exampleConstant`,
}

export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

    registerAction({
        name: FEATURE_NAME,
        hook: '$START_FEATURE',
        handler: (args, ctx) => {
            ctx.logger.info('WOOOW this is so cool')
        },
    })
}
```

Note the `registerHook` function, this one is used to register all your feature constants to the app so other features or your current feature can listen to them when they get fired.

Lets fire our constant with some arguments

```js 
export default ({ registerAction, registerHook }) => {
    registerHook(hooks)

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
```

We use `createHook` to fire an action with a constant. Check the `@forrestjs/hooks` for more documentation on how to use it. [@forrestjs/hooks createHook function](https://github.com/forrestjs/forrestjs/blob/master/packages/hooks/src/lib/create-hook.js)

Next step is to listen to that action

```js 
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
```

Our result can be viewed in our terminal. Should look like this

```bash
info: [express] server is running on 8080
info: WOOOW this is so cool

=================
Boot Trace:
=================

→ env ◇ start
→ logger ◇ start
♦ app/settings ◇ settings
→ express ◇ init::service
  → express-graphql → express/middleware
→ express ◇ start::service
▶ myfeaturename ◇ start::feature
  ▶ myfeaturename ▶ myfeaturename/exampleConstant
♦ app/trace ◇ finish


info: basic stuff
```

You can go wild with this & implement a monster application. A key note to have in mind, all the features & services in your app can export constants and fire them so other feature/services can listen & perform an action.

## More examples

Take a look `src/features/examples` for more examples

## Applying app settings

too be continued..

## Using services

too be continued..

## Creating express route

too be continued..

## Creating graphql route

too be continued..
