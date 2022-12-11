import { collection, getDoc, getDocs, doc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/Firebase.js'

class FirebaseContainer {
    constructor(collection) {
        this.collection = collection
    }

    async getAll() {
        const docSnap = await getDocs(collection(db, this.collection))

        const parsedData = []
        docSnap.forEach((doc) => {
            parsedData.push({
                id: doc.id, ...doc.data()
            })
        })

        return parsedData
    }

    async getById(id) {
        const docRef = doc(db, this.collection, id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            throw new Error(`No existe el id ${id}`)
        }

        const data = docSnap.data()

        return { id, ...data }
    }

    async save(object) {
        const docRef = await addDoc(collection(db, this.collection), {
            ...object,
            timestamp: serverTimestamp()
        })

        return { id: docRef.id, ...object }
    }

    async deleteById(id) {
        await this.getById(id) // verificar si exite el id

        await deleteDoc(doc(db, this.collection, id))

        return `El item ${id} fue eliminado`
    }
}

export default FirebaseContainer