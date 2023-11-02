# stuart-application-challenge

Application challenge to manage logs lines for Stuart curiers mobile app

## Introduction

This project is a test application for Stuart's company following the requirements detailed in the technical test.

## Explanation

This repository has two applications as microservices which are composed of:

1. **Rest-bff** -> service as a BFF to receive requests from external consumers such as mobile applications.
2. **Logging-service** -> logging service which is assigned the responsibility of storing on disk the log lines received by the BFF.

## Technologies

For this test, both applicacions were made using **NodeJS v18.17.1** and **Typescript**, however, both apps have been developed with different techniques, which will be explained below:

1. **Rest-bff** -> This microservice has been developed using the **NestJS framework v10.0**, the advantage of this framework is a speed when initializing, configuring and "starting up" RESTful applications. In addition, it provides certain features which enriches the quality of the microservice, such as:

   - `Architecture`: generates the application in different modules following scalable architectures which is a good idea for a skeleton project.
   - `Documentation`: Following the OpenAPI standard, NestJS auto-generates the REST API documentations following best practices in order to be understood and consumed by external clients.
   - `Validations`: Thanks to the implementation of DTO objects for endpoints, validation rules and formats for endpoint requests are automatically applied.
   - Online documentation: https://docs.nestjs.com/

2. **Logging-Service** -> This microservice has been developed using **Apollo-Server v3.12.1** together with the implementation of a folder hierarchy following a clean architecture. The architecture is divided into
   - `Application` : application layer where the service use cases are placed.
   - `Domain`: domain layer in charge of storing domain models/entities (logs) together with the definition of interfaces as repositories for the management of these models with external services (database, graphql service, etc).
   - `Infrastructure`: infrastructure layer where the application inputs/outputs are implemented, such as a main endpoint where client queries/mutations (as inputs) and access to repository implementations are received (as outputs)

For **disk storage** of logs, it has been decided to use a **MongoDB** instance through a Docker image, its configuration can be seen in the file `docker-compose.yml` file at the root level.

## Environments

As indicated in the test statement, having to skeleton the microservices, it has been decided to prepare both applications to be executed for two environments (dev and prod). In each application, we can find a folder called `config` which stores environment variables prepared for execution and deployment.
Example:

```
/config
    dev.env
    prod.env
```

# Application configuration and execution

1. **Rest-bff** -> move to `apps/rest-bff` directory and execute:

   ```
   npm i && npm run start:dev
   ```

   This command will stand up the service at <ins>`http://localhost:3000`<ins>

   To visualize the generated documentation via Swagger, you can do it through the path: <ins>`http://localhost:3000/api-doc`<ins>

   For tests:

   ```
   npm run test
   ```

2. **Logging-service** -> move to `apps/logging-service` directory and execute:

   ```
   npm i && npm run start:dev
   ```

   This command will stand up the service at <ins>`http://localhost:4000`<ins>

   To visualize the generated documentation via Swagger, you can do it through the path: <ins>`http://localhost:3000/api-doc`<ins>

   For tests:

   ```
   npm run test
   ```

   To initialize the database container for MongoDB, move to root repository folder and execute:

   ```
   docker-compose up -d
   ```

Once both applications are running, we can test the complete communication by calling the endpoint of the BFF, for example using this request:

```
curl --location 'localhost:3000/logs' \
--header 'Content-Type: application/json' \
--data '{
    "job_id": 12345,
    "message": "Job with id 12345 started",
    "status": "IN-PROGRESS"
}'
```

And we will get a JSON response similar as follows:

```
{
    "id": "fdacff94-90e3-44ce-9c09-b1137aa33cd0",
    "job_id": 12345,
    "message": "Job with id 12345 started",
    "status": "IN-PROGRESS",
    "created_at": "2023-11-01T14:14:16.870Z"
}
```

## Scalability & Kubernetes (k8s):

Due to the estimated time to perform the test and my limited knowledge in the preparation of deployment files to kubernetes. I have only been able to prepare the dockerization of both applications using a Dockerfile for each one.
