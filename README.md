1.1 Building Application and Launching the Application Locally

In order to launch the application you will require 3 command line windows

In window 1 navigate to pp3/registry and run the following command
>pp3/registry> mvnw 
In window 2 navigate to pp3/main and run the following commands

>pp3/main> mvnw clean
>pp3/main> mvnw -P -webpack

In window 3 navigate to pp3/main and run the following command

>pp3/main> npm install
And then run the following command
>pp3/main> npm start -P -webpack

It is very important to run these in the correct order. The application should open automatically in the webbrowser at localhost:9000.

1.2 Building Application and Launching to Google Cloud

If using windows 64 Bit, create a virtual linux machine and run Docker
In a command line window navigate to pp3/main and run the following command

>pp3/main> mvnw package -Pprod docker:build
 
If this command fails then try

>pp3/main>mvnw -ntp -Pprod -DskipTests verify jib:dockerBuild

Once the images are built, ensure you are logged into docker CLI and push the images into the docker registry with the following command 

>pp3/main> docker image tag pp1-blts/main
>pp3/registry> docker image tag pp1-blts/registry

>pp3/main>docker push pp1-blts/main
>pp3/main>docker push pp1-blts/registry

Then connect into the google cloud SDK and connect to the kubernetes CLI

>kubectl apply -f

Assuming the cluster exists, it should be called pp3-main, start the cluster with the following command

>gcloud container clusters resize pp3-main --num-nodes=3 

1.3 Connect to PostgresSQL

If something goes wrong with the production database you can access it with the following steps. Connect to the google cloud SDK and run 

>kubectl get pods

Find the pod name for the PostgresSQL container then in google cloud SDK connect to the container with

>kubectl exec -it  <POD_NAME> bash

Now you have a bash connection to the container, to create a session with the database run the following command

>psql -d main -U main -W

