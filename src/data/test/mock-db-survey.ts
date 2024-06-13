import type { AddSurveyRepository } from "../protocols/db/survey/add-survey-repository"
import type { AddSurveyParams } from "../usecases/survey/add-survey/add-survey-protocols"
import type { LoadSurveyByIdRepository } from "../protocols/db/survey/load-survey-by-id-repository"
import type { SurveyModel } from "../usecases/survey/load-survey-by-id/db-load-survey-by-id-protocol"
import type { SurveyResultModel, SaveSurveyResultRepository, SaveSurveyResultParams } from "../usecases/survey-result/save-survey-result/db-save-survey-result-protocol"
import { mockSurveyResultData } from "@/domain/test/mock-save-survey-model"
import { mockSurveyModel } from "@/domain/test"

export const mockAddSurveyRepository = (): AddSurveyRepository => {
    class AddsurveyRepositoryStub implements AddSurveyRepository {
        async add (data: AddSurveyParams): Promise<void> {
            return await Promise.resolve()
        }
    }

    return new AddsurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
    class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
        async loadById (id: string): Promise<SurveyModel> {
            return await Promise.resolve(mockSurveyModel())
        }
    }
    return new LoadSurveyByIdRepositoryStub()
}

export const mockSurveyResult = (): SurveyResultModel => Object.assign(
    {}, mockSurveyResultData(), { id: 'any_id' }
)

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepository implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return await Promise.resolve(mockSurveyResult())
        }
    }

    return new SaveSurveyResultRepository()
}
