import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

const STATIC_TOKENS = [
  { name: 'access_token', value: 'abc123' },
  { name: 'refresh_token', value: 'xyz789' }
];

// Разрешаем запросы со всех источников (для теста)
await fastify.register(cors, {
    origin: '*', // Или укажи конкретные источники, например: ["https://example.com", "chrome-extension://your-extension-id"]
    methods: ['GET', 'POST'],
  });

fastify.get('/token', async (request, reply) => {
  return STATIC_TOKENS;
});

// Эндпоинт для обработки поиска в LinkedIn
fastify.post('/linkedin-search', async (request, reply) => {
  console.log('Received search request:', request.body);
  return { status: 'ok' };
});

// Эндпоинт для отправки пользовательских данных
fastify.post('/linkedin', async (request, reply) => {
  console.log('Received user data:', request.body);
  return { status: 'ok' };
});

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
