# Helm

This is the final step of to containerize the application: having helm release.

The goal is to be able to use those release to:
- deploy locally
- deploy in production (eventually)


## How to use

### Run locally

Note: this will not build your chart!
- `docker build -t backend:local -f Dockerfile .`

Need to upload user-secrets to k8s secrets:
- kubectl create secret generic secret-appsettings -n apps  --from-literal=BlobStorage__ConnectionString=<secrets> --from-literal=AppConfig__ConnectionString=<secrets>


- Start the app: `helm upgrade pib .\apps\ -i --wait -n apps --create-namespace`
- Start the dependencies: `helm upgrade pib-dependencies .\dependencies\ -i --wait -n pib-dependencies --create-namespace`

Api: http//localhost:30080/swagger/index.html
WebApp: http://localhost:30300


## Good to know

- To run locally you must use a tag (and not latest) otherwise will try to fetch on docker registry
- To reference a services in an other namespace you must follow this naming `<serviceName>.<namespaceName>`



## Next steps

- Follow best practices: https://codersociety.com/blog/articles/helm-best-practices
-- Subchart
-- More templating
-- Use bitnami chart

- https://wkrzywiec.medium.com/how-to-deploy-application-on-kubernetes-with-helm-39f545ad33b8

- Easier setup with secrets locally (KeyVault or Manage Identity?)