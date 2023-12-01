import { Collection, MongoClient } from 'mongodb'
export const Mongohelper = {
    client: null as unknown as MongoClient,
    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(global.__MONGO_URI__)
        this.client.db(global.__MONGO_DB_NAME__)
    },

    async disconnect (): Promise<void> {
        await this.client.close()
    },

    async getCollection (name: string): Promise<Collection> {
        return this.client.db().collection(name)
    }
}
