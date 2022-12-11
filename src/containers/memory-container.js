import { v4 as uuidv4 } from 'uuid'

class MemoryContainer {
    constructor() {
        this.data = []
    }

    async getAll() {
        return this.data
    }

    async getById(id) {
        const item = this.data.find(p => p.id == id)
        if (!item) {
            throw new Error(`No existe el item ${id}`)
        }

        return item
    }

    async save(object) {
        object.timestamp = Date.now() / 1000
        object.id = uuidv4()

        this.data.push(object)
        return object
    }

    async deleteById(id) {
        await this.getById(id) // verificar si existe el id

        this.data = this.data.filter(item => item.id != id)

        return `El item ${id} fue eliminado`
    }
}

export default MemoryContainer