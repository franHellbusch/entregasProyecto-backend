import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

class FsContainer {
    constructor(archivo) {
        this.archivo = archivo
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            return {
                success: true,
                data: JSON.parse(data)
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
            const { data: objs } = await this.getAll()
            const data = objs.find(e => e.id == id)
            if (!data) {
                return {
                    success: false,
                    message: `No existe el id ${id}`
                }
            }
            return {
                success: true,
                data
            }
        } catch (err) {
            console.error(err)
            return {
                success: false,
                message: err.message
            }
        }
    }

    async save(object) {
        try {
            object.id = uuidv4()
            const { data: objs } = await this.getAll()
            objs.push(object)
            await fs.promises.writeFile(this.archivo, JSON.stringify(objs, null, 2))
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

    async deleteById(id) {
        try {
            const object = await this.getById(id)
            if (!object.success) return object

            let { data: objs } = await this.getAll()

            objs = objs.filter((p) => p.id != id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            return {
                success: true,
                message: `El item ${id} fue eliminado`
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

export default FsContainer