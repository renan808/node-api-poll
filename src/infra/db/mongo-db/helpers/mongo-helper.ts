import { MongoClient } from 'mongodb'
import type { Collection } from 'mongodb'

export const Mongohelper = {
    client: null as unknown as MongoClient,
    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri)
        this.client.db(global.__MONGO_DB_NAME__)
    },

    async disconnect (): Promise<void> {
        await this.client.close()
    },

    async getCollection (name: string): Promise<Collection> {
        return this.client.db().collection(name)
    },
     map: (collection: any): any => {
        const { _id, ...collectionWithoutId } = collection
        return Object.assign({}, collectionWithoutId, { id: _id.toString() })
    }
}
