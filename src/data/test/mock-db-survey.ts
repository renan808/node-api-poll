import type { AddSurveyRepository } from "../protocols/db/survey/add-survey-repository"
import type { AddSurveyParams } from "../usecases/survey/add-survey/add-survey-protocols"
import type { LoadSurveyByIdRepository } from "../protocols/db/survey/load-survey-by-id-repository"
import type { SurveyModel } from "../usecases/survey/load-survey-by-id/db-load-survey-by-id-protocol"
import { mockSurveyModel } from "@/domain/test"
export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddsurveyRepositoryStub implements AddSurveyRepository {
        async add (data: AddSurveyParams): Promise<void> {
            return await new Promise(resolve => resolve())
        }
    }

    return new AddsurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(mockSurveyModel()))
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}
