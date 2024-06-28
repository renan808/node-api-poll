import type { AddSurveyParams, AddSurveyRepository } from "@/data/use-cases/survey/add-survey/add-survey-protocols"
import type { LoadSurveysRepository } from "@/data/protocols/db/survey/load-surveys-repository"
import { Mongohelper } from "../helpers/mongo-helper"
import type { SurveyModel } from "@/domain/models/survey"
import type { LoadSurveyByIdRepository } from "@/data/use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocol"
import { ObjectId } from "mongodb"

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }

    async loadAll (): Promise<SurveyModel[]> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        const surveys: SurveyModel[] | any = await surveyCollection.find().toArray()
        return Mongohelper.mapCollection(surveys)
    }

    async loadById (id: string): Promise<SurveyModel> {
        const surveyCollection = await Mongohelper.getCollection('surveys')
        const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
        return Mongohelper.map(survey)
    }
}
