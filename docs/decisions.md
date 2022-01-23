https://www.yegor256.com/2015/08/04/nine-steps-start-software-project.html

# Decisions and alternatives

"For each decision I made, there has to be at least one alternative that I considered and rejected. "

- Language, modules, framework, main patterns,...

## Front-end

We use React because it is popular, well documented and have a lots of library to boost development speed.
- An alternative would be View.js but I have no knowledge of it.

We use TypeScript for the many benefits of a strongly typed programming language and that it is now well adopted.
- An alternative would be JavaScript but I want compile time type checking

We use React-Query for server state management because it seems highly recommended by the community to reduce boilerplate
- An alternative would be Redux-Thunk or Sagas but I want to avoid to many boilerplate codes for now.

We use the Chakra UI library because it seems well loved by the community and offer out of the box template.
- An alternative would be Material UI.

We structure the app using the Domain Folder Separation inspired from BulletProof-React and HospitalRun
- Bulletproof React: https://github.com/alan2207/bulletproof-react
- Hospital Run: https://github.com/HospitalRun/hospitalrun

We use Prettier and EsLint for the linting because it seems to be standard.

## Back-end

We use ASP.NET framework because it is the framework I have the most experienced with.
- An alternative would be Node.JS but I would need a lots of ramp-up and I want to focus on design more than on languages.

We use the CQRS pattern because I prefer modeling closer to user actions.
- An alternative would be CRUD.

We use the Mediator pattern because it help to implement CQRS and make testing easier by decoupling.

We use MongoDB because the flexibility of schema make it easier to develop and change.
- An alternative would be an RDBMS but I don't want to deal with schema update for now.

We structure the app base on the Clean Architecture model where domain object is at the center

We use editor config for styling rules.

## Tooling

We use Github actions, since it's the same place where the project is hosted which make it simpler.


## IoT

(WIP)