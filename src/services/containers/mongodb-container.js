import { v4 as uuidv4 } from 'uuid'

class MongodbContainer {
    constructor(model){
        this.model = model
    }

    async getAll() {
        try {
            const data = await this.model.find()
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

    async getById(id) {
        try {
            const data = await this.model.find({ uuid: id })
            if (data.length === 0) {
                return {
                    success: false,
                    message: `No existe el item ${id}`
                }
            }
            return {
                success: true,
                data: data[0]
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
            object.uuid = uuidv4()
            const newProduct = new this.model(object)
            await newProduct.save()

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
            const data = await this.model.deleteOne({ uuid: id })
            if (data.deletedCount === 0) {
                return {
                    success: false,
                    message: `No existe el id ${id}`
                }
            }
            return {
                success: true,
                message: `El id ${id} fue eliminado`
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

export default MongodbContainer