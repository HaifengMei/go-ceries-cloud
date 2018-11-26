#!/bin/bash
sudo docker build -t [Your Docker Hub Username]/go-ceries-cloud_app .
sudo docker push [Your Docker Hub Username]/go-ceries-cloud_app
ecs-cli configure --region us-east-1 --cluster goceriesTest
ecs-cli up --keypair [Your KeyPair File Name] --capability-iam --size 2 --instance-type t2.micro
ecs-cli compose --file aws-compose.yml up
ecs-cli ps
