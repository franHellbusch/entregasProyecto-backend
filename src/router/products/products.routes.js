const router = require('express').Router()
const _ = require('lodash')
const productsService = require('../../services/products/products.service')

router.get('/', async (_req, res, next) => {
    try {
        const data = await productsService.getAll()
        if (!data.success) return res.status(500).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        if (_.isNil(id)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }

        const data = await productsService.getById(id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { nombre, descripcion, precio, fotoURL, codigo, stock } = req.body
        if (_.isNil(nombre) || _.isNil(precio) || _.isNil(descripcion) || _.isNil(fotoURL) || _.isNil(codigo) || _.isNil(stock)) {
            return res.status(400).json({
                success: false,
                message: 'Faltan datos'
            })
        }
        const data = await productsService.setNewProduct(req.body)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { body } = req
        if (_.isNil(id) || _.isNil(body)) {
            return res.status(400).json({
                success: false,
                message: 'Req error'
            })
        }
        const data = await productsService.updateProduct(id, body)

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

        const data = await productsService.deleteProduct(id)

        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router