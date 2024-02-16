import { MongoClient } from 'mongodb'
import type { Collection } from 'mongodb'

export const Mongohelper = {
    client: null as unknown as MongoClient,
    uri: null as unknown as string,
    async connect (uri: string): Promise<void> {
        this.uri = uri
        this.client = await MongoClient.connect(uri)
        this.client.db(global.__MONGO_DB_NAME__)
    },

    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    },

    async getCollection (name: string): Promise<Collection> {
        if (!this.client) {
            this.client = await MongoClient.connect(this.uri)
        }
        return this.client.db().collection(name)
    },
     map: (collection: any): any => {
        if (!collection) {
            return null
        }
        const { _id, ...collectionWithoutId } = collection
        return Object.assign({}, collectionWithoutId, { id: _id })
    }
}
