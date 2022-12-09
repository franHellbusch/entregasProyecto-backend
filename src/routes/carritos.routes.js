import { Router } from "express"
import { deleteCart, getCart, postCart, postProduct, deleteProduct } from "../controllers/carritos.controller.js"
import { reqIdCartValidation, reqIdValidation } from "../middlewares/reqValidations.js"

const router = Router()

router.post('/', postCart)

router.get('/:id/productos', reqIdValidation, getCart)

router.post('/:id/productos/:prod_id', postProduct)

router.delete('/:id', deleteCart)

router.delete('/:id/productos/:prod_id', reqIdCartValidation, deleteProduct)

export default router