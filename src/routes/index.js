import { Router } from "express"
import productsRouter from './productos.routes.js'
import carritosRouter from './carritos.routes.js'

const router = Router()

router.use('/productos', productsRouter)
router.use('/carritos', carritosRouter)

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true, 
        environment: process.env.ENVIRONMENT || 'not found',
        health: 'up'
    })
})

export default router