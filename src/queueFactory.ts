import Bull, { Queue } from 'bull';

export const QueueFactory = {
  createQueue: <T>(queueName: string): Queue<T> => {
    return new Bull<T>(queueName, {
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        enableReadyCheck: false, // Necessário para evitar o erro
      },
    });
  },
};
