import { ZodError } from 'zod';

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (!(error instanceof ZodError)) {
      return next(error);
    }

    return res.status(400).json({
      success: false,
      message: 'Error de validación de datos',
      errors: error.issues.map(issue => ({
        campo: issue.path[0] ?? '',
        mensaje: issue.message,
      })),
    });
  }
};