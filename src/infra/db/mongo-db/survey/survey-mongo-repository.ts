import type { AddSurveyModel, AddSurveyRepository } from "../../../../data/usecases/add-survey/add-survey-protocols"
import { Mongohelper } from "../helpers/mongo-helper"

export class SurveyMongoRepository implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }
}
