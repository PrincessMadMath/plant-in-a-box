# Goal

Implement app using the n-tier architecture.
- Version 1 using Mongo
- Version 2 swapping for SQL and Entity Framework (https://chathuranga94.medium.com/connect-database-to-asp-net-core-web-api-63a53e8da1ca)



# Followed steps

1. Follow setup ASP + Setup-React


2. Connect to database

How implement cleanly 
- Repository pattern: https://qappdesign.com/code/using-mongodb-with-net-core-webapi/
- Dependency injection: (https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#service-lifetimes-and-registration-options)


4. Implement classic 3 tier (presentation, Business, Data)

- Split in 3 project to enforce dependency flow

https://chathuranga94.medium.com/n-tier-architecture-in-asp-net-core-d1f1b14f2010


5. Python to local machine

Find Ipv4 but failed... because kestrel listen on local host and hot 0.0.0.0 (https://stackoverflow.com/questions/38175020/cant-access-localhost-via-ip-address/38175246)


# Next Steps

Unit of work 
(https://chathuranga94.medium.com/unit-of-work-for-asp-net-core-706e71abc9d1)
- New transaction in Mongo