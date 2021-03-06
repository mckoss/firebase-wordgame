# Firebase-wordgame

My first Firebase app.  A multi-person [crossword game](http://words.coderats.com).

This app uses:

- [Firebase](http://firebase.com) - Realtime storage API
- [Polymer](http://polymer-project.org) - Web components
- [Bower](http://bower.io) - Client-side package manager
- [Node/NPM](http://nodejs.org) - Dev tools package manager
- [Qunit](http://qunitjs.com) - Unit testing framework
- [Namespace](https://github.com/mckoss/namespace) - Javascript modules (CommonJS)
- [flatiron director](https://github.com/flatiron/director) - Routing library

## Build instructions

Run these command to start developing:

    $ source tools/use           # Setup $PATH to include local project tools directory
    $ configure-project          # Download dependencies
    $ run-server                 # Run a web server running the current dev version

## Testing

Unit test are run in web browser:

    http://localhost:8080/test

## Deployment

Run a "compiled" (vulcanized) version locally:

    $ build-app                  # Make deployable version
    $ run-server --build         # Run a web server running the deployed version

Deploy build to Firebase hosting:

    $ deploy-app
