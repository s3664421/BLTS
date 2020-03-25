# main

## Development


How to start the project
you need to open 3 cmd windows

    cd into 
    pp3/main> mvnw
    pp3/main>npm start
    pp3/registry >mvnw

## Testing

To launch your application's tests, run:

    ./mvnw verify

    
### Client tests

Unit tests are run by Jest

    npm test

##  Building a production copy
Assuming kubernetes and docker config files havent changed 

using docker in pp3/main
	mvnw package -Pprod docker:build

if it fails like in the tutorial 
	The issue was simple - the command is mvn clean package dockerfile:build and not mvn clean package docker:build

woah is it like "can't find your docker image base file still?

then you need to run (doesnt say this anywhere in documentation)
	mvnw -ntp -Pprod -DskipTests verify jib:dockerBuild

Then tag and push the images in each directory
pp3/main> docker image tag pp1-blts/main
	>docker push pp1-blts/main

then run kubectl apply -f in the kubernetes folder
on gcloud 
 
to turn off a cluster 
gcloud container clusters resize $CLUSTER_NAME --num-nodes=0

to start up a cluster
gcloud container clusters resize $CLUSTER_NAME --num-nodes=3 

// Not working yet
kubectl port-forward jhipster-registry-0 8761:8761


##  Entering into cloud database
//Look at database
connect to the cluster

get the pod name for the database the one that has postgres in it
>kubectl get pods

then in gcloud cluster console
>kubectl exec -it  <POD_NAME> bash

through bash connect to db under name main
>psql -d main -U main -W

now you're in the database its not sql though so different syntax



did you screw up the database?
that's okay

just do mvnw clean
mvnw 



