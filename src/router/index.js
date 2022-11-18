const router = require('express').Router()
const productsRouter = require('./products/products.routes')
const carritoRouter = require('./carrito/carrito.routes')

router.use('/productos', productsRouter)
router.use('/carrito', carritoRouter)

router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        environment: process.env.environment,
        health: 'up'
    })
})

module.exports = router