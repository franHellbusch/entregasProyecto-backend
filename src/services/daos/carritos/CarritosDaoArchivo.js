import fs from 'fs'
import FsContainer from '../../containers/fs-container.js'
import productsService from '../productos/productosDaoArchivo.js'

class FsCarritos extends FsContainer {
    constructor() {
        super('./src/db/fileSystem/carritos.json')
    }

    async save() {
        const carrito = {}
        carrito.data = new Array()

        const result = await super.save(carrito)
        return result
    }

    async setNewProduct(id, prod_id) {
        try {
            const cart = await this.getById(id)
            if (!cart.success) return cart
            const product = await productsService.getById(prod_id)
            if (!product.success) return product

            const { data: carritos } = await this.getAll()

            carritos.forEach((cart) => {
                if (cart.id === id) {
                    if (cart.data.some((p) => p.product.id == prod_id)) {
                        cart.data.map(p => {
                            p.product.id === prod_id && (p.quantity += 1)
                            return p
                        })
                    } else {
                        let productObject = {
                            quantity: 1,
                            product: product.data
                        }
                        cart.data.push(productObject)
                    }
                }
            })

            await fs.promises.writeFile(this.archivo, JSON.stringify(carritos, null, 2))

            return {
                success: true,
                message: `El producto fue agregado al carrito ${id}`
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteProduct(id, prod_id) {
        try {
            const cart = await this.getById(id)
            if (!cart.success) return cart
            const product = await productsService.getById(prod_id)
            if (!product.success) return product

            const { data: carritos } = await this.getAll()

            let validProdId = true

            carritos.forEach((cart) => {
                if (cart.id === id) {
                    cart.data = cart.data.filter((p) => p.product.id != prod_id)
                }
                const validation = cart.data.some((e) => e.product.id == prod_id)
                if (!validation) {
                    console.log('hola')
                    validProdId = false
                }
            })

            if (!validProdId) {
                return {
                    success: false,
                    message: `No existe el id ${prod_id} en el carrito`
                }
            }

            await fs.promises.writeFile(this.archivo, JSON.stringify(carritos, null, 2))

            return {
                success: true,
                message: `Fue eliminado el producto ${prod_id} del carrito ${id}`
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }
}

const carritosService = new FsCarritos()

export default carritosService