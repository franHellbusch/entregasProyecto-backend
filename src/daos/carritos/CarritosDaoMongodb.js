import MongodbContainer from "../../containers/mongodb-container.js"
import carritoModel from "../../models/carrito.model.js"
import productsService from "../productos/productosDaoMongodb.js"

class CarritosMongodb extends MongodbContainer {
    constructor() {
        super(carritoModel)
    }

    async save() {
        const carrito = {}
        carrito.products = new Array()

        const result = await super.save(carrito)
        return result
    }

    async setNewProduct(id, prod_id) {
        const product = await productsService.getById(prod_id)
        const cartById = await this.getById(id)

        await cartById.products.push(product)// push al array products del carrito

        cartById.save() // guardando el array en mongo

        return cartById
    }

    async deleteProduct(id, prod_id) {
        const cartById = await this.getById(id)

        cartById.products = await cartById.products.filter(product => product._id != prod_id) // eliminar producto del array

        cartById.save() // guardando arrat en mongo

        return cartById
    }
}

const carritosService = new CarritosMongodb()

export default carritosService