import { arrayRemove, arrayUnion, doc, getDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/Firebase.js'
import FirebaseContainer from '../../containers/firebase-container.js'
import productsService from '../productos/productosDaoFirebase.js'

class FirebaseCarritos extends FirebaseContainer {
    constructor(){
        super('carritos')
    }

    async save() {
        const carrito = {}
        carrito.products = new Array()

        return await super.save(carrito)
    }

    async setNewProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id
        const product = await productsService.getById(prod_id) // traer producto para agregarlo

        const docRef = doc(db, this.collection, id)
        const docSnap = await getDoc(docRef, 'products') // traer el array de productos del carrito
        const productsArray = docSnap.data()

        productsArray.products.push(product)
        await updateDoc(docRef, 'products', productsArray) // update al array de productos

        return productsArray
    }

    async deleteProduct(id, prod_id) {
        await this.getById(id) // verificar si existe el id
        const product = await productsService.getById(prod_id) // traer el producto

        const docRef = doc(db, this.collection, id)

        await updateDoc(docRef, {
            products: arrayRemove(product) // firebase no permite eliminar el producto anidado por id
        })

        return `Se borro el producto ${prod_id} del carrito`
    }
}

const carritosService = new FirebaseCarritos()

export default carritosService