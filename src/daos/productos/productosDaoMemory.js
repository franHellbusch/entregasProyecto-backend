import MemoryContainer from "../../containers/memory-container.js";

class MemoryProducts extends MemoryContainer {
    constructor() {
        super()

        this.products = this.data
    }

    async save(object) {
        object.precio = parseFloat(object.precio)

        return await super.save(object)
    }

    async updateProduct(id, object) {
        const product = await this.getById(id)

        object.precio && (object.precio = parseFloat(object.precio))

        let productObject = {
            ...product,
            ...object
        }

        this.products = this.products.map((product) => {
            if (product.id == id) {
                product = productObject
            }
            return product
        })

        return productObject
    }
}

const productsService = new MemoryProducts()

export default productsService