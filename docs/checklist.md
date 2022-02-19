## What

**What is the ultimate goal of the app? What problem does it solve?**

Keep plant alive with minimal human intervention and alert humans when intervention is required before it is too late for the plant.

-   Taking care of a plant is demanding because you need manual operations and memory
    -- When was the last time I watered my plant?
    -- For this species what is the specification?
    -- You need to check if the soil is dry.
-   Our head is already busy with so many things that it's easy to forget and it costs lives and then you need to deal with grief and shame.

**What are the "user personas" of the app?**

For a household with a plant lover not-tech heavy but with a IOT thinkerer to do the initial setup.

**What kind of app is the team building? What hardware will it run on (web, mobile, desktop, etc.)?**

There will be 2 part:

-   Web application
-   IoT with sensors and actuators for a plant

**What framework(s) will the app be built with/on?**

Web Application:

-   ASP.NET CORE
-   MediatoR

Front-End

-   CRA
-   React-Query
-   Chakra-UI

**What architectural pattern(s) will the app leverage?**

Backend:

-   Mediator
-   CQRS

**What programming language(s) will the app be written in?**

Backend:

-   C#

Frontend:

-   React

**What persistence store(s) will the app use?**

-   MongoDB

**What kinds of tests will the app require?**

-   Unit tests
-   Integration tests

**What will the initial source control structure look like?**

-   Where does code go?
-   Where do tests go?
-   Where do docs go?
-   Where do build scripts go?

Backend:
-API
-- Controllers
-Infrastructure
-- Setup of services (DB,...)
-Domain
-- Commands, Query, Entity

Frontend:
-app
-- Setup of the application (theme, routes,...)
-pages
-- 1 folder by page
-shared

-   api: interface to server
-   component: re-usable components
-   config
-   utils

**What build/deploy automation tools does the app use?**

Github actions.

## How

**How is the application deployed? Where? On-premises, in the cloud?**

**Does the team differentiate between [production deployments and product releases](https://mailchi.mp/ardalis/dev-tip-1379429)?**

Yes

**How do different parts of the app communicate with one another?**

-   In process library method calls: Pattern MediatoR
-   Out of process API calls: Client-wrapper that wrap service or SDK
-   Out of process async messages: Message in queue

**How does the system communicate with its persistence store?**

-   Direct calls

**How will the app handle cross-cutting concerns?**

-   Logging: Serilog
-   Security/Auth: Connect with google (https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/google-logins?view=aspnetcore-6.0)
