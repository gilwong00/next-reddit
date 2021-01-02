import 'reflect-metadata';
import express from 'express';
import path from 'path';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import routes from './routes';
import { createConnection } from 'typeorm';
import { Post, User, Vote } from './entities';

dotenv.config();

const initServer = async () => {
  const PORT = process.env.PORT ?? 5000;
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_URL,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
    migrations: [path.join(__dirname, './server/migrations/*')],
    entities: [User, Post, Vote]
  });

  app.use(express.json());
  app.use(morgan('combined'));
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === 'production'
          ? 'prod url'
          : 'http://localhost:3000'
    })
  );
  app.use(
    session({
      name: 'user',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
        httpOnly: true,
        sameSite: 'lax'
      },
      store: new RedisStore({
        client: redis,
        disableTouch: true
      })
    })
  );

  app.use('/api', routes);

  app.listen(PORT, async () => console.log(`running on port ${PORT}`));
};

initServer().catch(err => console.error(err));
