import _ from "lodash"

export const reqContentValidation = (req, res, next) => {
    const { nombre, precio, fotoURL, descripcion, stock } = req.body

    if (_.isNil(nombre) || _.isNil(precio) || _.isNil(fotoURL) || _.isNil(descripcion) || _.isNil(stock)) {
        return res.status(404).json({
            success: false,
            message: 'Req error: missing body content'
        })
    }

    next()
}

export const reqBodyValidation = (req, res, next) => {
    const { body } = req

    if (_.isNil(body)) {
        return res.status(404).json({
            success: false,
            message: 'Req error: body is required'
        })
    }

    next()
}

export const reqIdValidation = (req, res, next) => {
    const { id } = req.params

    if (_.isNil(id)) {
        return res.status(404).json({
            success: false,
            message: 'Req error: id param is required'
        })
    }

    next()
}

export const reqIdCartValidation = (req, res, next) => {
    const { id, prod_id } = req.params

    if (_.isNil(id) || _.isNil(prod_id)) {
        return res.status(404).json({
            success: false,
            message: 'Req error: id and prod_id params are required'
        })
    }

    next()
}