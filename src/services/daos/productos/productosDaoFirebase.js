import FirebaseContainer from '../../containers/firebase-container.js'

class FirebaseProducts extends FirebaseContainer {
    constructor(){
        super('products')
    }
}

const productsService = new FirebaseProducts()

export default productsService