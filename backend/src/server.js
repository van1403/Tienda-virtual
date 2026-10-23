import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API de TiendaVirtualTecnologia',
    health: '/api/health',
  });
});

// Endpoint de estado
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API funcionando' });
});

// Rutas principales
app.use('/api', router);

// Middleware de manejo de errores (Debe ir al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});