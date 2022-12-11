import { Router } from "express"
import { deleteCart, getAll, getCart, postCart, postProduct, deleteProduct } from "../controllers/carritos.controller.js"

const router = Router()

router.post('/', postCart)

router.get('/', getAll)

router.get('/:id/productos', getCart)

router.post('/:id/productos/:prod_id', postProduct)

router.delete('/:id', deleteCart)

router.delete('/:id/productos/:prod_id', deleteProduct)

export default router