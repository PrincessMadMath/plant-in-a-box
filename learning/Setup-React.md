Source: https://create-react-app.dev/

1. CRA + TypeScript

2. Connect the Front-end to backend

How handle CORS
- https://code-maze.com/enabling-cors-in-asp-net-core/ 


3. Linting

* Setup ESLint with TS (https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
* Setup ESLint + Prettier (https://khalilstemmler.com/blogs/tooling/prettier/)

Si ne montre pas erreur dans VS code: s'assurer de donner permission (https://dev.to/tillsanders/eslint-not-working-in-vscode-help-build-a-troubleshooting-checklist-fdc)


4. Settings by environment

https://create-react-app.dev/docs/adding-custom-environment-variables

https://github.com/motdotla/dotenv

You can use .env file to specify setting.

By default:
* start will use .env
* build will use .env.production

(seems to be baked since static files)

5. Update package

`npx npm-check-updates -u` pour mettre latest version dans package.json
`npm install` pour appliquer changement

How package work: https://medium.com/coinmonks/everything-you-wanted-to-know-about-package-lock-json-b81911aa8ab8