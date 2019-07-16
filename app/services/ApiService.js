
export class DataStore{
    constructor(dbName){
        
    }
    async list(){
        await this.pull();
        const docs = await this.store.find({});
        return docs;
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