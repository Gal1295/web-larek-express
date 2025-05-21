const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

export default { PORT, DB_ADDRESS };
