
#nodejs #express #graphql #postgressql #docker

## Project codebase

```bash                   
├── src
│   ├── features                # app features, added to state. create your work here...
│   ├── boot.js                 # app boot file
│   ├── state.js                # app state, link your features here
├── index.js                    # knows where to find project files when starting project
├── package.json                # knows how to start project
├── .env                        # constains app enironment variables
├── docker-compose.yml          # handle docker environment containers like postgres
└── Makefile                    # simple commands to run apps & containers
```
