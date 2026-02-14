import ioredis from 'ioredis';

const redis = new ioredis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || ""),
  password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err: any) => {
  console.error('Redis error:', err);
});

export default redis;