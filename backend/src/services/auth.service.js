import { supabase } from '../config/supabase.js';
import { prisma } from '../config/prisma.js';

export const AuthService = {
  register: async (userData) => {
    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('No se pudo crear el usuario en Supabase');

    // 2. Buscar o crear el rol CUSTOMER por defecto
    let role = await prisma.role.findUnique({ where: { name: 'CUSTOMER' } });
    if (!role) {
      role = await prisma.role.create({ data: { name: 'CUSTOMER', description: 'Cliente regular' } });
    }

    // 3. Crear el perfil en nuestra base de datos PostgreSQL
    const userProfile = await prisma.userProfile.create({
      data: {
        authId: authData.user.id,
        roleId: role.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || null
      },
      select: { id: true, firstName: true, lastName: true, email: true, role: true } // Ocultar datos sensibles
    });

    return { user: userProfile, session: authData.session };
  },

  login: async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw new Error('Credenciales incorrectas');

    const userProfile = await prisma.userProfile.findUnique({
      where: { authId: data.user.id },
      select: { id: true, firstName: true, lastName: true, email: true, role: true }
    });

    return { user: userProfile, session: data.session };
  }
};