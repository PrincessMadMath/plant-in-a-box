# Helm

This is the final step of to containerize the application: having helm release.

The goal is to be able to use those release to:
- deploy locally
- deploy in production (eventually)


## How to use

### Run locally

Note: this will not build your chart!
- `docker build -t backend:local -f Dockerfile .`

1. First you need to install local dependencies (Mongo DB, k8s secrets)
- Build helm dependency: `helm dependency build`
- Install release and set secrets:  `helm upgrade pib-dependencies .\local-dependencies\ -i --wait -n pib --create-namespace --set secrets.blobStorageConnectionString=<secret> --set secrets.appConfigConnectionString=<secret>`

2. Deploy the app
- Build helm dependency: `helm dependency build`
- Install release and set development values: `helm upgrade apps .\apps\ -i --wait -n pib --create-namespace -f .\apps-values\development.yaml`

3. Access the app: 
- Api: http//localhost:30080/swagger/index.html
- WebApp: http://localhost:30300


## Good to know

- To run locally you must use a tag (and not latest) otherwise will try to fetch on docker registry
- To reference a services in an other namespace you must follow this naming `<serviceName>.<namespaceName>`
- Secrets is only accessible by resources in the same namespaces
- To pass not encoded secrets as vars: use stringData and not data
- Deployment selector are immutable: you can't patch them


## Next steps

- Follow best practices: https://codersociety.com/blog/articles/helm-best-practices
-- Subchart
-- More templating
-- Use bitnami chart

- https://wkrzywiec.medium.com/how-to-deploy-application-on-kubernetes-with-helm-39f545ad33b8

- Easier setup with secrets locally (KeyVault or Manage Identity?)