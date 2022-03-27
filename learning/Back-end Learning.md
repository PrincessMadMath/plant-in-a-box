# Learning ASP.net

## Initial setup

https://dev.to/moesmp/what-every-asp-net-core-web-api-project-needs-part-1-serilog-o5a


- Dependency injection: (https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#service-lifetimes-and-registration-options)

- Make it a secret: (https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows)
- Use with rider: https://medium.com/datadigest/user-secrets-in-asp-net-core-with-jetbrains-rider-26c381177391

### Linting

Good recap: https://medium.com/@michaelparkerdev/linting-c-in-2019-stylecop-sonar-resharper-and-roslyn-73e88af57ebd
Default: https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/StyleCop.Analyzers/StyleCop.Analyzers.CodeFixes/rulesets/StyleCopAnalyzersDefault.ruleset 

sa: style analysis
ca: code analysis (roselyn analyzer)

## API

https://dotnettutorials.net/lesson/controller-action-return-types-core-web-api/


## Logging

https://benfoster.io/blog/serilog-best-practices/

https://stackoverflow.com/questions/69828142/does-asp-net-core-logging-api-have-method-to-create-independent-loggers-similar

Need to understand CORS:

- https://code-maze.com/enabling-cors-in-asp-net-core/ 


## Understanding CRQS:

- https://www.codeproject.com/articles/991648/cqrs-a-cross-examination-of-how-it-works
- https://exceptionnotfound.net/real-world-cqrs-es-with-asp-net-and-redis-part-1-overview/
- https://docs.geteventflow.net/index.html
- https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs
- https://enterprisecraftsmanship.com/posts/validate-commands-cqrs/ (how implement CQRS in dot net)

## Setup Mongo Repository:

- https://qappdesign.com/code/using-mongodb-with-net-core-webapi/

## Setup secret:

- https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows (look for mapping to POCO)
- https://medium.com/datadigest/user-secrets-in-asp-net-core-with-jetbrains-rider-26c381177391


## Http Client
- https://www.stevejgordon.co.uk/sending-and-receiving-json-using-httpclient-with-system-net-http-json
- https://levelup.gitconnected.com/c-net-json-deserialization-with-system-net-http-json-and-httpclients-9f49ffb7d9e3



## Github actions
- How do backend: https://blog.kritner.com/2021/11/29/cicd-for-net6-with-github-actions/



## Documenation about .net 5

- Complete exemple: https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-5.0&tabs=visual-studio 


# Project Structure

* Minimal API approach: https://timdeschryver.dev/blog/maybe-its-time-to-rethink-our-project-structure-with-dot-net-6#conclusion