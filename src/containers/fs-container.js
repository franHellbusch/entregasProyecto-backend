import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

class FsContainer {
    constructor(archivo) {
        this.archivo = archivo
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            console.error(err)
            // Error de archivo no econtrado
            if (err.code === 'ENOENT') {
                throw new Error('Archivo no encontrado')
            }
        }
    }

    async getById(id) {
        const items = await this.getAll()
        const data = items.find(e => e.id == id)

        if (!data) {
            throw new Error(`No existe el id ${id}`)
        }
        return data
    }

    async save(object) {
        object.timestamp = Date.now() / 1000
        object.id = uuidv4()
        const items = await this.getAll()

        items.push(object)
        await fs.promises.writeFile(this.archivo, JSON.stringify(items, null, 2))

        return object
    }

    async deleteById(id) {
        await this.getById(id) // verificar si existe el id
        let items = await this.getAll()

        items = items.filter((p) => p.id != id)
        await fs.promises.writeFile(this.archivo, JSON.stringify(items, null, 2))
        return `El item ${id} fue eliminado`
    }
}

export default FsContainer