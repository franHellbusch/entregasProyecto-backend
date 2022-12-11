import { Schema, model } from "mongoose"

const productSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        fotoURL: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const productModel = model('product', productSchema)

export { productModel, productSchema }