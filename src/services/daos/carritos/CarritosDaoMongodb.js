import MongodbContainer from "../../containers/mongodb-container.js"
import carritoModel from "../../../models/carrito.model.js"
import productsService from "../productos/productosDaoMongodb.js"

class CarritosMongodb extends MongodbContainer {
    constructor() {
        super(carritoModel)
    }

    async save() {
        const carrito = {}
        carrito.data = new Array()

        const result = await super.save(carrito)
        return result
    }

    async setNewProduct(id, prod_id) {
        try {
            const product = await productsService.getById(prod_id)
            if (!product.success) return product
            const { data: cartById } = await this.getById(id)

            await cartById.data.push(product.data)
            
            cartById.save()

            return {
                success: true,
                data: cartById
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteProduct(id, prod_id) {
        try {
            const { data: cartById } = await this.getById(id)

            cartById.data = await cartById.data.filter(product => product._id != prod_id)

            cartById.save()

            return {
                success: true,
                data: cartById
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

const carritosService = new CarritosMongodb()

export default carritosService