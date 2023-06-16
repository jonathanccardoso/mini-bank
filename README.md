# Mini Bank

> Introductory project to microservices and queue management with Kafka.

## Structure

<h3 align="left">
  <img alt="Structure" title="#structure" width="700px" src=".github/structure.png"><br>
</h3>

## :zap: Technologies

- [NestJS](https://nestjs.com/)
- [Kafka](https://kafka.apache.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)

## Pending features

- [x] MonoRepo with Yarn workspace
- [x] Create micro services to payment
- [x] Add typescript
- [x] Create configuration process env
- [x] Send e-mails
- [ ] Tests on projects
- [ ] Create microservices to send e-mails
- [ ] Create frontend

## :rocket: Development

### Commands backend

```console
❯ yarn server
```

Open app application in bash

```console
❯ sudo docker-compose exec app sh
❯ nest g resource resource-name // in src folder project
❯ nest g service service-name // in src folder project
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

### Commands frontend

```console
❯ yarn dev
```

### Environments

- Create `.env.development` and set on api services;
- Create `.env.local` and set on api services;

---

<h4 align="center">
  Code made :purple_heart: by <a href="https://www.linkedin.com/in/jonathanccardoso/" target="_blank">Jonathan Cardoso</a>
</h4>
