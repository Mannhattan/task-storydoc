# task-storydoc

How to start:
Just simply run `docker compose -f ./docker-compose.production.yaml up --build` and the app will be available on `http://localhost`.

How to start development environment:
Run `docker compose -f ./docker-compose.development.yaml up --build` and the app will be available on `http://localhost`.

Tools used:
- nginx - reverse proxy for dev environment and deploying the app
- docker & docker-compose - for building and serving (containerizing in general) the application and setting up network stuff
- @dnd-kit - dragging, dropping and sorting tasks
- redux-persist - for saving redux store to localstorage and retrieving it (+hydration and dehydration of state)
- @reduxjs/toolkit - managing state

PS For some strange reason I couldn't log in to Figma file and couldn't take exact pixel-perfect approach to the design (reading values and other options)
