const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const products = require('../products/products.service')

class Carrito {
    constructor(path) {
        this.path = __dirname + path
        this.carritos = []
    }

    async getFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carritos = JSON.parse(data)
            this.carritos = carritos
        } catch (err) {
            console.log(err)
            await fs.promises.writeFile(this.path, JSON.stringify([]))
            return {
                success: false,
                message: err.message
            }
        }
    }

    async newCart() {
        try {
            const carrito = {}
            carrito.id = uuidv4()
            carrito.data = new Array()

            this.carritos.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2))
            return {
                success: true,
                data: carrito.id
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getCart(id) {
        try {
            const cart = this.carritos.find((cart) => cart.id === id)
            if (!cart) {
                return {
                    success: false,
                    message: `No existe ningun carrito con el id ${id}`
                }
            }
            return {
                success: true,
                data: cart.data
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async setNewProduct(id, prod_id) {
        try {
            const cart = await this.getCart(id)
            if (!cart.success) return cart
            const product = await products.getById(prod_id)
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

            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2))

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

    async deleteCart(id) {
        try {
            const cart = await this.getCart(id)
            if (!cart.success) return cart

            this.carritos = this.carritos.filter(cart => cart.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2))

            return {
                success: true,
                message: `El carrito con el id ${id} fue eliminado`
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
            const cart = await this.getCart(id)
            if (!cart.success) return cart
            const product = await products.getById(prod_id)
            if (!product.success) return product

            this.carritos.forEach((cart) => {
                if (cart.id === id) {
                    cart.data = cart.data.filter((p) => p.product.id != prod_id)
                }
            })

            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2))

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

const carrito = new Carrito('/carrito.json')

carrito.getFile()

module.exports = carrito