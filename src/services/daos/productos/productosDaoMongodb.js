import MongodbContainer from "../../containers/mongodb-container.js"
import { productModel } from "../../../models/product.model.js"

class MongodbProducts extends MongodbContainer {
    constructor() {
        super(productModel)
    }

    async updateProduct(id, object) {
        try {
            const data = await this.model.updateOne({ uuid: id }, object)
            if (data.matchedCount === 0) {
                return {
                    success: false,
                    message: `No existe producto con el id ${id}`
                }
            }
            return {
                success: true,
                message: `Producto con id ${id} cambiado`
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }
}

const productsService = new MongodbProducts()

export default productsService