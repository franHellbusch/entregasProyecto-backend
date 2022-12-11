import CartDto from "../dtos/cart.dto.js"
const carritosService = await (
    await import(`../daos/carritos/CarritosDao${process.env.DATACORE}.js`)
).default

export const postCart = async (_req, res, next) => {
    try {
        const data = await carritosService.save()
        const dataDto = new CartDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const data = await carritosService.getAll()
        res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await carritosService.getById(id)
        const dataDto = new CartDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const postProduct = async (req, res, next) => {
    try {
        const { id, prod_id } = req.params

        const data = await carritosService.setNewProduct(id, prod_id)
        const dataDto = new CartDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await carritosService.deleteById(id)
        res.status(200).json({
            success: true,
            message: data
        })
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (_req, res, next) => {
    try {
        const { id, prod_id } = _req.params

        const data = await carritosService.deleteProduct(id, prod_id)
        res.status(200).json({
            success: true,
            message: data
        })
    } catch (err) {
        next(err)
    }
}