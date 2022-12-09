import fs from 'fs'
import FsContainer from '../../containers/fs-container.js'

class FsProducts extends FsContainer {
    constructor() {
        super('./src/db/fileSystem/products.json')
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

            const { data: products } = await this.getAll()

            const productsAux = products.map((product) => {
                if (product.id == id) {
                    product = productObject
                }
                return product
            })

            await fs.promises.writeFile(this.archivo, JSON.stringify(productsAux, null, 2))
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

const productsService = new FsProducts()

export default productsService