import MemoryContainer from "../../containers/memory-container.js";

class MemoryProducts extends MemoryContainer {
    constructor() {
        super()

        this.products = this.data
    }

    async save(object) {
        object.timestamp = Date.now() / 1000
        object.precio = parseFloat(object.precio)

        const result = await super.save(object)
        return result
    }

    async updateProduct(id, object) {
        try {
            const product = await this.getById(id)
            if (!product.success) return product

            object.precio && ( object.precio = parseFloat(object.precio) )

            let productObject = {
                ...product.data,
                ...object
            }

            this.products = this.products.map((product) => {
                if (product.id == id) {
                    product = productObject
                }
                return product
            })

            return {
                success: true,
                data: productObject
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

const productsService = new MemoryProducts()

export default productsService