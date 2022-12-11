import MongodbContainer from "../../containers/mongodb-container.js"
import { productModel } from "../../models/product.model.js"

class MongodbProducts extends MongodbContainer {
    constructor() {
        super(productModel)
    }

    async updateProduct(id, object) {
        try {
            await this.getById(id)
            await this.model.findByIdAndUpdate(id, object)

            return `Producto con id ${id} cambiado`
        } catch (err) {
            console.error(err)
            // Error de contraseña mal ingresada de mongoose
            if (err.name === 'CastError') {
                throw new Error(`No existe el id ${id}`)
            }
            throw new Error(err.message)
        }
    }
}

const productsService = new MongodbProducts()

export default productsService