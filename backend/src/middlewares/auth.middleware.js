import { supabase } from '../config/supabase.js';
import { prisma } from '../config/prisma.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token de acceso no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar token con Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }

    // Adjuntar la información de la base de datos al request
    const userProfile = await prisma.userProfile.findUnique({
      where: { authId: user.id },
      include: { role: true }
    });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'Perfil de usuario no encontrado' });
    }

    req.user = userProfile;
    next();
  } catch (error) {
    next(error);
  }
};