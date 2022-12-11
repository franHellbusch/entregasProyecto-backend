import MemoryContainer from "../../containers/memory-container.js";
import productsService from "../productos/productosDaoMemory.js";

class MemoryCarritos extends MemoryContainer {
    constructor() {
        super()

        this.carritos = this.data
    }

    async save() {
        const carrito = {}
        carrito.products = new Array()

        return await super.save(carrito)
    }

    async setNewProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id
        const product = await productsService.getById(prod_id)

        this.carritos.forEach((cart) => {
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

        return this.carritos
    }

    async deleteProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id

        let validProdId = true

        this.carritos.forEach((cart) => {
            // validar si existe el id de producto en el carrito
            const validation = cart.products.some((e) => e.product.id == prod_id)
            if (!validation) {
                validProdId = false
            }
            // eliminar productos
            if (cart.id === id) {
                cart.products = cart.products.filter((p) => p.product.id != prod_id)
            }
        })

        if (!validProdId) {
            throw new Error(`No existe el id ${prod_id} en el carrito`)
        }

        return this.carritos
    }
}

const carritosService = new MemoryCarritos()

export default carritosService