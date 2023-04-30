# Deploy to prod manually


https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-prepare-acr?tabs=azure-cli

0. Build your images
```

```


1. Tag and push your images to ACR
```ps
docker tag backend:latest pib0acr.azurecr.io/backend:v1
docker push pib0acr.azurecr.io/backend:v1

docker tag frontend:local pib0acr.azurecr.io/frontend:v1
docker push pib0acr.azurecr.io/frontend:v1
```



## Think to look at:

- sample code: https://github.com/Azure-Samples/azure-voting-app-redis
- https://learn.microsoft.com/en-us/azure/aks/csi-secrets-store-driver



## FAQ

- If issue about go-login: `az aks install-cli`