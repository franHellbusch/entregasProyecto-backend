import MemoryContainer from "../../containers/memory-container.js";
import productsService from "../productos/productosDaoMemory.js";

class MemoryCarritos extends MemoryContainer {
    constructor() {
        super()

        this.carritos = this.data
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

            this.carritos.forEach((cart) => {
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

            console.log(this.carritos)

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

            let validProdId = true

            this.carritos.forEach((cart) => {
                const validation = cart.data.some((e) => e.product.id == prod_id)
                if (!validation) {
                    validProdId = false
                }
                if (cart.id === id) {
                    cart.data = cart.data.filter((p) => p.product.id != prod_id)
                }
            })

            if (!validProdId) {
                return {
                    success: false,
                    message: `No existe el id ${prod_id} en el carrito`
                }
            }

            console.log(this.carritos)

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

const carritosService = new MemoryCarritos()

export default carritosService