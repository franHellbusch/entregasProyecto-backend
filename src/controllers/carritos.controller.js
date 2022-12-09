const carritosService = await (
    await import(`../services/daos/carritos/CarritosDao${process.env.DATACORE}.js`)
).default

export const postCart = async (req, res, next) => {
    try {
        const data = await carritosService.save()
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await carritosService.getById(id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const postProduct = async (req, res, next) => {
    try {
        const { id, prod_id } = req.params

        const data = await carritosService.setNewProduct(id, prod_id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await carritosService.deleteById(id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (_req, res, next) => {
    try {
        const { id, prod_id } = _req.params

        const data = await carritosService.deleteProduct(id, prod_id)
        if (!data.success) return res.status(400).json(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}