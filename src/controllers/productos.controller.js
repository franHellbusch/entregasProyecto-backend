import 'dotenv/config'
import ProductDto from '../dtos/product.dto.js'
const productsService = await (
    await import(`../daos/productos/productosDao${process.env.DATACORE}.js`)
).default

export const getAll = async (_req, res, next) => {
    try {
        const data = await productsService.getAll()
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err) {
        next(err)
    }
}

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await productsService.getById(id)
        const dataDto = new ProductDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const saveProduct = async (req, res, next) => {
    try {
        const { body } = req

        const data = await productsService.save(body)
        const dataDto = new ProductDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { body } = req
        const { id } = req.params

        const data = await productsService.updateProduct(id, body)
        const dataDto = new ProductDto(data)
        res.status(200).json({
            success: true,
            data: dataDto.build()
        })
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params

        const data = await productsService.deleteById(id)
        res.status(200).json({
            success: true,
            message: data
        })
    } catch (err) {
        next(err)
    }
}