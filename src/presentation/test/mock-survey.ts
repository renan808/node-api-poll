import type { AddSurvey, AddSurveyParams } from "../controllers/survey/add-survey/add-survey-protocols"
import type { httpRequest } from '@/presentation/protocols/http'
import type { LoadSurveys, SurveyModel } from "../controllers/survey/load-survey/load-surveys-protocols"
import { mockSurveysModel, mockSurveyModel } from "@/domain/test"
import type { LoadSurveyById } from "@/domain/use-cases/survey/load-survey-by-id"

export const mockAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyParams): Promise<void> {
        }
    }
    return new AddSurveyStub()
}

export const mockRequest = (): httpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
})

export const mockLoadSurveys = (): LoadSurveys => {
    class LoadSurveyStub implements LoadSurveys {
        async loadAll (): Promise<SurveyModel[]> {
            return mockSurveysModel()
        }
    }
    return new LoadSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel | null> {
            return await Promise.resolve(mockSurveyModel())
        }
    }
    return new LoadSurveyByIdStub()
}
