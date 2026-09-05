# https://www.docker.com/blog/9-tips-for-containerizing-your-net-application/
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-env

WORKDIR /app

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish PIB.Api -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "PIB.Api.dll" ]