
* Start database server:  `docker-compose up -d`\
* Stop database server:  `docker-compose down`
* Delete data (when container is down): delete  folder `mongodb-data`



### Reference

https://dev.to/raphaelmansuy/postgres-up-and-running-in-less-than-3-minutes-with-docker-compose-1odd



# Containerize App

For API:
- docker run -e "ASPNETCORE_ENVIRONMENT=Development" -p 8080:80   api-test

TO Fix:
- Missing some secrets configuration