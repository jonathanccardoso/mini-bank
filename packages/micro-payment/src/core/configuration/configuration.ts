export default () => ({
  app: {
    host: process.env.HOST_MAIL,
    portMail: parseInt(process.env.PORT_MAIL),
    authPass: process.env.AUTH_PASS_MAIL,
    authUser: process.env.AUTH_USER_MAIL,
    mailFrom: process.env.MAIL_FROM,
  },
  database: {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA,
  },
});
