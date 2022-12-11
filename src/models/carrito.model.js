import { Schema, model } from "mongoose"
import { productSchema } from "./product.model.js"

const carritoSchema = new Schema(
    {
        products: [productSchema]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const carritoModel = model('carrito', carritoSchema)

export default carritoModel