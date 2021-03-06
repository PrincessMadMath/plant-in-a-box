# Goal

Implement app using the n-tier architecture.
- Version 1 using Mongo
- Version 2 swapping for SQL and Entity Framework (https://chathuranga94.medium.com/connect-database-to-asp-net-core-web-api-63a53e8da1ca)



# Followed steps

1. First mission have .net 5 API with swagger

- Some issue on how to register route (and how it work)
- Using Swagger


2. Connect to database

How implement cleanly 
- Repository pattern: https://qappdesign.com/code/using-mongodb-with-net-core-webapi/
- Dependency injection: (https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#service-lifetimes-and-registration-options)

Where keep connection string
- Use appsettings.json
- Make it a secret: (https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows)
- Use with rider: https://medium.com/datadigest/user-secrets-in-asp-net-core-with-jetbrains-rider-26c381177391

3. Connect the Front-end

How handle CORS
- https://code-maze.com/enabling-cors-in-asp-net-core/ 



# Next Steps

Unit of work 
(https://chathuranga94.medium.com/unit-of-work-for-asp-net-core-706e71abc9d1)
- New transaction in Mongo