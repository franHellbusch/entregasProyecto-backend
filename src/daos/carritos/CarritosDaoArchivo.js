import fs from 'fs'
import FsContainer from '../../containers/fs-container.js'
import productsService from '../productos/productosDaoArchivo.js'

class FsCarritos extends FsContainer {
    constructor() {
        super('./src/db/fileSystem/carritos.json')
    }

    async save() {
        const carrito = {}
        carrito.products = new Array()

        return await super.save(carrito)
    }

    async setNewProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id
        const product = await productsService.getById(prod_id) // traer el producto para agregarlo

        const carritos = await this.getAll()

        carritos.forEach((cart) => {
            if (cart.id === id) {
                // agregando la cantidad de elementos en el carrito
                if (cart.products.some((p) => p.product.id == prod_id)) {
                    cart.products.map(p => {
                        p.product.id === prod_id && (p.quantity += 1)
                        return p
                    })
                } 
                // agregando el producto con la key quantity
                else {
                    let productObject = {
                        quantity: 1,
                        product: product
                    }
                    cart.products.push(productObject)
                }
            }
        })

        await fs.promises.writeFile(this.archivo, JSON.stringify(carritos, null, 2))

        return carritos
    }

    async deleteProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id

        const carritos = await this.getAll()

        console.log(carritos)

        let validProdId = true

        carritos.forEach((cart) => {
            // validar si existe el id de producto en el carrito
            const validation = cart.products.some((e) => e.product.id == prod_id)
            if (!validation) {
                validProdId = false
            }
            // eliminar productos
            if (cart.id === id) {
                cart = cart.products.filter((p) => p.product.id != prod_id)
            }
        })

        if (!validProdId) {
            throw new Error(`No existe el id ${prod_id} en el carrito`)
        }

        await fs.promises.writeFile(this.archivo, JSON.stringify(carritos, null, 2))

        return carritos
    }
}

const carritosService = new FsCarritos()

export default carritosService