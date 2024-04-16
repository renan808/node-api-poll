import type { AddSurveyModel, AddSurveyRepository } from "@/data/usecases/add-survey/add-survey-protocols"
import type { LoadSurveysRepository } from "@/data/protocols/db/survey/load-surveys-repository"
import { Mongohelper } from "../helpers/mongo-helper"
import type { SurveyModel } from "@/domain/use-cases/load-surveys"

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }

    async loadAll (): Promise<SurveyModel[]> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        const surveys: SurveyModel[] | any = await surveyCollection.find().toArray()
        return surveys
    }
}
