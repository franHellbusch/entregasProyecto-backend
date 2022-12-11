import _ from "lodash"

// Verificar datos del body
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