## 2 alternatives

* Use Auth service (https://auth0.com/pricing/)
* Handle myself

## Hard (but free way)

### SSO fundamental

https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/what-is-single-sign-on
https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview

* Using Identity Provider (which provide security token)
* Client receive token and cookie from ID provider, foward token to server
* Trust relationship between Server & Identity Provider (can validate token)
* Once validate: server set cookie on client side (create session)
* If she connected to other server that trust the ID Provider she use cookie to prevent re-signin

Security Token (contains claim)
* Subject
* Issued at
* Expiration
* Audience (can validate token is for himself)

* Different flow if there is a server or it's only a SPA
* Different si juste sign-in ou veut utiliser API associé au ID Provider (i.e: Microsoft Graph)

### Microsoft Identity Platform

https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/azure-ad-endpoint-comparison

### Implementation with asp net core + Azure MD

https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-aspnet-core-webapp

Warning:
* Be careful of target (i.e: organizations vs consumers vs ...)
* Application type
** Server side rendering (Web app)
** Web API (SPA + API)

Plein d'exemple pour poker graph mais pas son proper api: https://keithbabinec.com/2020/09/27/oauth-2-0-authorization-code-flow-with-a-react-spa-asp-net-core-web-api-rbac-roles-and-msal/

### What is scope?

(TODO)

### What is "Authorized client application"

Without configuring this setting: a sign-in user will need to re-consent the targetted scope



### Nice ressource

* Plein de vidéo qui a l'air très bien expliqué: https://www.youtube.com/channel/UCBwvQc_3OkejVEZbHjqiNTg
https://keithbabinec.com/2020/09/27/oauth-2-0-authorization-code-flow-with-a-react-spa-asp-net-core-web-api-rbac-roles-and-msal/
https://github.com/Azure-Samples/ms-identity-javascript-react-tutorial/blob/main/3-Authorization-II/2-call-api-b2c/SPA/src/authConfig.js

Documentation pour ASP.NET Core 5.0