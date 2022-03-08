1. Fake API

In app seems easy, quick and allow strong typing for the fake data. But it prevent easily testing networking scenario.


2. React Query

https://betterprogramming.pub/7-tips-for-using-react-query-in-large-projects-22ccc49d61c2

* Enum for ServerStateKeys
* Wrap in custom hooks
** Include mutation and side effect (like toast) (but allow to pass Options in args)
* Group by domain
* By default cached data is consider as stale (can configure staleTime globally)

https://tkdodo.eu/blog/practical-react-query
* Lots of in depth best practices

https://tsh.io/blog/react-query-tutorial/
* Useful exemple


3. Various tips

https://proxify.io/articles/build-large-scale-React-apps


How use date formatting in Nivo
- https://github.com/d3/d3-scale
- https://momentjs.com/docs/#/displaying/unix-timestamp-milliseconds/


# App structure

## Inspiration

https://github.com/oldboyxx/jira_clone/tree/master/client/src
* Structure
** App - Main applications routes,component that needs to be mounted at all times regardless of current routes,...
** shared - Components, constants, utils, hooks, styles,...
** 1 folder by route under /src
*** Mostly index.js (under folder name about the component) +style.css
*** Date fetching use custom hook and is done directly in the components

Rules: can only import from ancestor


https://github.com/HospitalRun/hospitalrun
(utilise react-query)
* App.tsx setup tools (route, devtools,...) get session and render default route / => HospitalRun.jsx
* HospitalRun.jsx bootstrap layout + define routing
* 1 shared folder:
** Cocmponents
** config: for i18n + pouchdb
** db: Use pouchdb for offline in browser database - define each repository by entities
** hooks: like usetranslator (with i18n)
** locales: translation for each language
** model: Model for the entity found in the db
** redux store (combine all slices)
** util: DateHelper, uuid, DateHelper,...
* 1 folder by routes
** Folder and main file have same name
** Main file check + specific routing + validate permissions
** Subfolder hooks for all data fetching + mutation (subfolder can reach up to access hooks)
** Import models defines in shared
** Subfolder for each component (useful to tests + style)


https://www.robinwieruch.de/react-folder-structure
* Excellent exemple qui montre différentes options + étapes pour grandir avec le temps


https://github.com/alan2207/bulletproof-react
* Up to date + details structure with all the bell and whistle (linting + test) and a documentation to explains all


https://stackoverflow.com/questions/55221433/is-there-an-official-style-guide-or-naming-convention-for-react-based-projects

# IDE config

- Config import https://blog.jetbrains.com/webstorm/2020/07/configuring-the-style-of-imports-in-javascript-and-typescript/
- ESLint + Prettier
-- https://www.jetbrains.com/help/rider/eslint.html#ws_js_eslint_activate
-- https://www.jetbrains.com/help/rider/Prettier.html


#  UI/UX

https://www.mockplus.com/blog/post/list-ui-design