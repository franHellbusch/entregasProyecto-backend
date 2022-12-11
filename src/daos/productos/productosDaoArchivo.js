import fs from 'fs'
import FsContainer from '../../containers/fs-container.js'

class FsProducts extends FsContainer {
    constructor() {
        super('./src/db/fileSystem/products.json')
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

        const products = await this.getAll()

        const productsAux = products.map((product) => {
            if (product.id == id) {
                product = productObject
            }
            return product
        })

        await fs.promises.writeFile(this.archivo, JSON.stringify(productsAux, null, 2))
        return productObject
    }
}

const productsService = new FsProducts()

export default productsService