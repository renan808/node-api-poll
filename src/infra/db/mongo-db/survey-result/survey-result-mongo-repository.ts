import type { SaveSurveyResultRepository, SaveSurveyResultParams, SurveyResultModel } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocol"
import { Mongohelper } from "../helpers/mongo-helper"
export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        const surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
        console.log(data.accountId)
        const newSurvey = await surveyResultsCollection.findOneAndUpdate({
            accountId: data.accountId,
            surveyId: data.surveyId
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnDocument: 'after'
        })
        return await new Promise((resolve, reject) => resolve(Mongohelper.map(newSurvey)))
    }
}
