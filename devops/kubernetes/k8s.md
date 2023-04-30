# What is missing

MongoDB need a volume, probably not a replicat set...



# How to use locally

https://docs.docker.com/desktop/kubernetes/

You can target a local image by specifing the tag (otherwise if latest will try to pull image)
- Need to tag image: `docker tag [image id] [image name]:[tag]`

1. Build backend and frontend  image (+ tag it to local
2. Apply all .yaml files
3. Api can be access at http//localhost:30080 and WebApp at http://localhost:30300


# Doc

Networking: https://blog.ovhcloud.com/getting-external-traffic-into-kubernetes-clusterip-nodeport-loadbalancer-and-ingress/