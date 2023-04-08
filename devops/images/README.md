# Containerize App with Docker Compose

Working POC on how run the application locally using docker.

The idea was to create a stepping stones toward k8s.

## How to use without docker-compose

### For API:

- Build the api image from `./backend` with the command: `docker build -t api-test -f Dockerfile .`
- Run an instance of the built image: `docker run -e "ASPNETCORE_ENVIRONMENT=Development" -p 8080:80 api-test`

TO Fix:
- Missing some secrets configuration

### For Web

- docker run -d -p 1234:3000 web   

https://www.geeksforgeeks.org/how-to-dockerize-a-reactjs-app/

TO Fix:
- Using prod env (not working locally) - https://dev.to/eslynn/how-to-dynamically-change-your-react-environment-variables-without-re-building-55el
- HTTPS


## How to use with docker-compose

Using docker-compose simplify orchestrating the start of multiple containers! It will:
- Automatically build the images
- Configure each instances
- Configure networking betweens instances

To run docker-compose: `docker compose up`


## Good to know

https://www.docker.com/blog/9-tips-for-containerizing-your-net-application/
https://www.softwaredeveloper.blog/multi-project-dotnet-core-solution-in-docker-image