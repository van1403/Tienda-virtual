import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  register: async (req, res, next) => {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error.message.includes('already registered')) {
        return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
      }
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  },

  // Endpoint de prueba para verificar que el token funciona
  me: async (req, res) => {
    res.status(200).json({ success: true, data: req.user });
  }
};