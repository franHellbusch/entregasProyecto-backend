class MongodbContainer {
    constructor(model) {
        this.model = model
    }

    async getAll() {
        const data = await this.model.find()
        return data
    }

    async getById(id) {
        try {
            const data = await this.model.findById(id)

            if (data == null) {
                throw new Error(`No exite el id ${id}`)
            }

            return data
        } catch (err) {
            console.error(err)
            // Error de contraseña mal ingresada de mongoose
            if (err.name === 'CastError') {
                throw new Error('Id mal ingresado')
            }
            throw new Error(err.message)
        }
    }

    async save(object) {
        const newProduct = new this.model(object)
        await newProduct.save()

        return object
    }

    async deleteById(id) {
        try {
            await this.getById(id) // verificar si existe el id
            await this.model.findByIdAndDelete(id)

            return `El id ${id} fue eliminado`
        } catch (err) {
            console.error(err)
            // Error de contraseña mal ingresada de mongoose
            if (err.name === 'CastError') {
                throw new Error('id mal ingresado')
            }
            throw new Error(err.message)
        }
    }
}

export default MongodbContainer