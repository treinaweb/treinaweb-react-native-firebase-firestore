import firebase from 'react-native-firebase';

const db = firebase.firestore();

export class DataStore{
    constructor(collectionName){
        this.collection = db.collection(collectionName);
    }
    formatList(querySnapshot){
        return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    }
    async list(){
        const querySnapshot = await this.collection.get();
        return this.formatList(querySnapshot);
    }
    async create(item){
        const doc = await this.store.create(item);
        await this.push();
        return doc;
    }
    async update(doc){
        const newDoc = await this.store.update(doc.id, doc.rev, doc.body);
        await this.push();
        return newDoc;
    }
    async remove(id){
        await this.store.delete(id);
        await this.push();
        return id;
    }
}