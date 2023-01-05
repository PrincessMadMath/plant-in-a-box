# Containerize App (WIP)

Not production ready

## For API:

- docker build -t api-test -f Dockerfile .
- docker run -e "ASPNETCORE_ENVIRONMENT=Development" -p 8080:80   api-test

TO Fix:
- Missing some secrets configuration

https://www.docker.com/blog/9-tips-for-containerizing-your-net-application/
https://www.softwaredeveloper.blog/multi-project-dotnet-core-solution-in-docker-image


## For Web

- docker run -d -p 1234:3000 web   

https://www.geeksforgeeks.org/how-to-dockerize-a-reactjs-app/

TO Fix:
- Using prod env (not working locally) - https://dev.to/eslynn/how-to-dynamically-change-your-react-environment-variables-without-re-building-55el
- HTTPS