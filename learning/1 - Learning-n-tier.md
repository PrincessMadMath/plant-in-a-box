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


4. Implement classic 3 tier (presentation, Business, Data)

- Split in 3 project to enforce dependency flow

https://chathuranga94.medium.com/n-tier-architecture-in-asp-net-core-d1f1b14f2010


5. Python to local machine

Find Ipv4 but failed... because kestrel listen on local host and hot 0.0.0.0 (https://stackoverflow.com/questions/38175020/cant-access-localhost-via-ip-address/38175246)


6. Deploy Azure

Get subscription (for dev and formation purpose may have acccess to MPN)
Create own AD to have full admin right (https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-access-create-new-tenant)
Transfer subscription (https://docs.microsoft.com/en-us/azure/role-based-access-control/transfer-subscription)

Web App:
https://www.azurebarry.com/introduction-to-azure-app-service-part-1/
https://docs.microsoft.com/en-us/azure/app-service/

Building a pipeline:
- Issue with missing assembly (https://www.abhith.net/blog/azure-devops-build-could-not-locate-the-assembly/)
- Understand publish (vs build) https://www.hanselman.com/blog/setting-up-azure-devops-cicd-for-a-net-core-31-web-app-hosted-in-azure-app-service-for-linux
- Using Rider Azure tools to prototype
- Pipeline vs Release

Zero to Hero (App Service)
https://azure.github.io/AppService/tags/#zero-to-hero

# Next Steps

Unit of work 
(https://chathuranga94.medium.com/unit-of-work-for-asp-net-core-706e71abc9d1)
- New transaction in Mongo