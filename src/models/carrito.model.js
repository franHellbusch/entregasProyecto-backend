import { Schema, model } from "mongoose"
import { productSchema } from "./product.model.js"

const carritoSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    data: [productSchema]
})

const carritoModel = model('carrito', carritoSchema)

export default carritoModel