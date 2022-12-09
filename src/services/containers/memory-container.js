import { v4 as uuidv4 } from 'uuid'

class MemoryContainer {
    constructor() {
        this.data = []
    }

    async getAll() {
        return this.data
    }

    async getById(id) {
        try {
            const item = this.data.find(p => p.id == id)
            if (!item) {
                return {
                    success: false,
                    message: `No existe el item ${id}`
                }
            }

            return {
                success: true,
                data: item
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async save(object) {
        try {
            object.id = uuidv4()
            
            this.data.push(object)
            return {
                success: true,
                data: object
            }
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async deleteById(id) {
        try {
            const product = await this.getById(id)
            if (!product.success) return product

            this.data = this.data.filter(item => item.id != id)

            return {
                success: true,
                message: `El item ${id} fue eliminado`
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

export default MemoryContainer