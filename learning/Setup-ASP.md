1. First mission have .net 5 API with swagger

- Some issue on how to register route (and how it work)
- Using Swagger

2. Setting + injection

- Dependency injection: (https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-3.1#service-lifetimes-and-registration-options)

Where keep connection string
- Use appsettings.json
- Make it a secret: (https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows)
- Use with rider: https://medium.com/datadigest/user-secrets-in-asp-net-core-with-jetbrains-rider-26c381177391

Use dev vs prod
- appsettings.json vs appsettings.Development.json
- Can also use settings of Azure Web App
- Possible to use Azure Keyvault to centralize


3. Python to local machine

Find Ipv4 but failed... because kestrel listen on local host and hot 0.0.0.0 (https://stackoverflow.com/questions/38175020/cant-access-localhost-via-ip-address/38175246)

4. Deploy Azure

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

5. Linting 

Good recap: https://medium.com/@michaelparkerdev/linting-c-in-2019-stylecop-sonar-resharper-and-roslyn-73e88af57ebd
Default: https://github.com/DotNetAnalyzers/StyleCopAnalyzers/blob/master/StyleCop.Analyzers/StyleCop.Analyzers.CodeFixes/rulesets/StyleCopAnalyzersDefault.ruleset 

sa: style analysis
ca: code analysis (roselyn analyzer)


Editor config n'est pas utilisé durant le CI? (https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/code-style-rule-options)

Quand utilser règle stylecop vs editorconfig? 

6. How configure Rider?

Conflict with rule (this.)... how fix for all teams (.idea but normally ignore (TODO))

## Logging

https://benfoster.io/blog/serilog-best-practices/

https://stackoverflow.com/questions/69828142/does-asp-net-core-logging-api-have-method-to-create-independent-loggers-similar

## General setup

https://dev.to/moesmp/what-every-asp-net-core-web-api-project-needs-part-1-serilog-o5a

    <ItemGroup>
      <Reference Include="Microsoft.Extensions.Configuration, Version=6.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60">
        <HintPath>..\..\..\..\Program Files\dotnet\shared\Microsoft.AspNetCore.App\6.0.0\Microsoft.Extensions.Configuration.dll</HintPath>
      </Reference>
      <Reference Include="Microsoft.Extensions.Options.ConfigurationExtensions, Version=6.0.0.0, Culture=neutral, PublicKeyToken=adb9793829ddae60">
        <HintPath>..\..\..\..\Program Files\dotnet\shared\Microsoft.AspNetCore.App\6.0.0\Microsoft.Extensions.Options.ConfigurationExtensions.dll</HintPath>
      </Reference>
    </ItemGroup>

## ASP NET API

https://dotnettutorials.net/lesson/controller-action-return-types-core-web-api/