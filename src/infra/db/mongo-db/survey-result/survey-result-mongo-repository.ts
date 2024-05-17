import type { SaveSurveyResultRepository, SaveSurveyResultModel, SurveyResultModel } from "@/data/usecases/save-survey-result/db-save-survey-result-protocol"
import { Mongohelper } from "../helpers/mongo-helper"
export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    // fzr uns protocol pras classes q tão no infra
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
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
