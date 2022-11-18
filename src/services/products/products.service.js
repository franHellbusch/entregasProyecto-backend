const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

class Products {
    constructor(archivo) {
        this.archivo = __dirname + archivo
        this.products = []
    }

    async getFile() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            const products = await JSON.parse(data)
            this.products = products
        } catch (error) {
            console.error(error)
            this.products = []
        }
    }

    async getAll() {
        try {
            return {
                success: true,
                data: this.products
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getById(id) {
        try {
            const product = this.products.find(product => product.id == id)
            if (!product) {
                return {
                    success: false,
                    message: `No existen productos con el id ${id}`
                }
            }
            return {
                success: true,
                data: product
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async setNewProduct(object) {
        try {
            object.id = uuidv4()
            object.timestamp = Date.now()
            this.products.push(object)
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.products, null, 2))
            return {
                success: true,
                data: object
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async updateProduct(id, object) {
        try {
            const product = await this.getById(id)
            if (!product.success) return product

            let productObject = {
                ...product.data,
                ...object
            }

            this.products.map((product) => {
                if (product.id == id) {
                    product = productObject
                }
                return product
            })

            await fs.promises.writeFile(this.archivo, JSON.stringify(this.products, null, 2))
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

    async deleteProduct(id) {
        try {
            const product = await this.getById(id)
            if (!product.success) return product
    
            this.products = this.products.filter((p) => p.id != id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.products, null, 2))
            return {
                success: true,
                message: `El producto ${id} fue eliminado`
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

const products = new Products('/products.json')

products.getFile()

module.exports = products