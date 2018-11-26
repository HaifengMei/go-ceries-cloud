#!/bin/bash
sudo docker build -t [Your Docker Hub Username]/go-ceries-cloud_app .
sudo docker push [Your Docker Hub Username]/go-ceries-cloud_app:latest
ecs-cli configure --region us-east-1 --cluster goceries-app
ecs-cli up --keypair [Your KeyPair File Name] --capability-iam --size 2 --instance-type t2.micro
for i in 1 2 3 4 5; do ecs-cli compose --file aws-compose.yml up && break || sleep 15; done
ecs-cli ps
