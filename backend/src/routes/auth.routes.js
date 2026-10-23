import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas públicas con validación Zod
router.post('/register', validateSchema(registerSchema), AuthController.register);
router.post('/login', validateSchema(loginSchema), AuthController.login);

// Ruta privada (requiere token JWT)
router.get('/me', requireAuth, AuthController.me);

export default router;