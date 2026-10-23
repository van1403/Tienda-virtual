import { Router } from 'express';
import categoryRoutes from './category.routes.js';

const router = Router();

router.use('/categories', categoryRoutes);
// Aquí agregaremos luego: router.use('/products', productRoutes);
// router.use('/orders', orderRoutes); etc...

export default router;