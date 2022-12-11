import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/Firebase.js'
import FirebaseContainer from '../../containers/firebase-container.js'

class FirebaseProducts extends FirebaseContainer {
    constructor(){
        super('products')
    }

    async updateProduct(id, object) {
        await this.getById(id)// verificar que existe el id
        object.precio && (object.precio = parseFloat(object.precio))

        const docRef = doc(db, this.collection, id)
        await updateDoc(docRef, object)

        return `El producto ${id} fue cambiado`
    }
}

const productsService = new FirebaseProducts()

export default productsService