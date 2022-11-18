const router = require('express').Router()
const _ = require('lodash')
const carrito = require('../../services/carrito/carrito.service')

router.post('/', async (_req, res, next) => {
    try {
        const data = await carrito.newCart()
        if (!data.success) return res.status(500).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/productos', async (req, res, next) => {
    try {
        const { id } = req.params
        if (_.isNil(id)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }
        
        const data = await carrito.getCart(id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/:id/productos/:prod_id', async (req, res, next) => {
    try {
        const { id, prod_id } = req.params
        if (_.isNil(id) || _.isNil(prod_id)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }

        const data = await carrito.setNewProduct(id, prod_id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        if (_.isNil(id)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }

        const data = await carrito.deleteCart(id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id/productos/:prod_id', async (req, res, next) => {
    try {
        const { id, prod_id } = req.params
        if (_.isNil(id) || _.isNil(prod_id)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }

        const data = await carrito.deleteProduct(id, prod_id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})


module.exports = router