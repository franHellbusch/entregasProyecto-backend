import 'dotenv/config'
const productsService = await (
    await import(`../services/daos/productos/productosDao${process.env.DATACORE}.js`)
).default

export const getAll = async (_req, res, next) => {
    try {
        const data = await productsService.getAll()
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await productsService.getById(id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const saveProduct = async (req, res, next) => {
    try {
        const { body } = req

        const data = await productsService.save(body)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { body } = req
        const { id } = req.params

        const data = await productsService.updateProduct(id, body)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await productsService.deleteById(id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}