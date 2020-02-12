
## Start Postgres database

start-pg:
	docker-compose stop postgres
	docker-compose rm -f postgres
	docker-compose up -d postgres
	docker-compose logs -f postgres

stop-pg:
	docker-compose stop postgres
	docker-compose rm -f postgres
	docker-compose up -d postgres
	docker-compose logs -f postgres

## Run node app

dev-app:
	yarn && yarn start:dev

prod-app:
	yarn && yarn start

## Reset node project

reset:
	rm -rf build
	rm -rf node_modules
	