# Mini Bank

> Introductory project to microservices, metrics and queue management with Kafka.

## Structure

<h3 align="left">
  <img alt="Structure of the project" title="#structure" width="800px" src=".github/structure.png"><br>
</h3>

## :zap: Technologies

- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Kafka](https://kafka.apache.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Grafana](https://grafana.com/)
- [Prometheus](https://prometheus.io/)
- [SocketIO](https://socket.io/pt-br/get-started/chat)

## Pending features

- [x] MonoRepo with Yarn workspace
- [x] Create micro services to payment
- [x] Add typescript
- [x] Create configuration process env
- [x] Send emails to the payee of the transaction
- [x] Create frontend
- [x] Add websocket
- [x] Add monitoring with prometheus in port `http://localhost:9090` consumer infos from `http://localhost:3000/metrics` and grafana `http://localhost:4000`

Obs: more details about system in [ASSETS FOLDER](./assets/).

## Future features

- [] Change db to mongoDB
- [] Apply tests both backend and frontend
- [] Apply Design Patterns and Clean Architecture
- [] Deploy applications

## :rocket: Development

```console
❯ sudo docker-compose up --build -d
```

### Commands backend

```console
❯ yarn install
❯ yarn server
```

Open app application in bash in src folder project

```console
❯ sudo docker-compose exec app sh
❯ nest g resource resource-name
❯ nest g service service-name
```

### Commands frontend

```console
❯ yarn dev
```

### Documentation API

[URL](http://localhost:3000/api/)

### Commands kafka console

Producer

```console
❯ sudo docker-compose exec kafka bash
❯ kafka-console-producer --topic topic-name --bootstrap-server localhost:9092
```

Consumer

```console
❯ sudo docker-compose exec kafka bash
❯ kafka-console-consumer --topic topic-name --bootstrap-server localhost:9092
```

### Environments

- Create `.env` and set on api services;

---

<h4 align="center">
  Code made :purple_heart: by <a href="https://www.linkedin.com/in/jonathanccardoso/" target="_blank">Jonathan Cardoso</a>
</h4>
