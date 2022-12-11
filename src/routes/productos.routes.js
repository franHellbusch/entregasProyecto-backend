import { Router } from "express"
import { deleteProduct, getAll, getById, saveProduct, updateProduct } from "../controllers/productos.controller.js"
import { reqBodyValidation, reqContentValidation } from "../middlewares/reqValidations.js"

const router = Router()

router.get('/', getAll)

router.get('/:id', getById)

router.post('/', reqContentValidation, saveProduct)

router.put('/:id', reqBodyValidation, updateProduct)

router.delete('/:id', deleteProduct)

export default router