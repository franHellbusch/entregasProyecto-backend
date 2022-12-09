import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '../../config/Firebase.js'

class FirebaseContainer {
    constructor(collection) {
        this.collection = collection
    }

    async getAll() {
        const docSnap = await getDocs(collection(db, this.collection))

        const parsedData = []
        docSnap.forEach((doc) => {
             parsedData.push({ id: doc.id, ...doc.data() 
            }) 
        })

        return {
            success: true,
            data: parsedData
        }
    }
}

export default FirebaseContainer