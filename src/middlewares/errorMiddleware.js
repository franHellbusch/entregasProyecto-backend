const errorMiddleware = (error, _req, res, _next) => {
    res.status(500).send({
        success: false,
        error: error.message
    })
}

module.exports = errorMiddleware