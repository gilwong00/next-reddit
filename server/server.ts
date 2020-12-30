import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import routes from './routes';
const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(express.json());
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
app.use(morgan('combined'));
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

app.listen(PORT, () => console.log(`running on port ${PORT}`));
