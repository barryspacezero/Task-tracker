import ioredis from 'ioredis';

let redis: ioredis | null = null;

function getRedis() {
  if (!redis) {
    if (process.env.REDIS_URL) {
      redis = new ioredis(process.env.REDIS_URL);
    } else {
      redis = new ioredis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
      });
    }

    redis.on('connect', () => {
      console.log('Connected to Redis');
    });

    redis.on('error', (err: any) => {
      console.error('Redis error:', err);
    });
  }
  return redis;
}

export default getRedis;