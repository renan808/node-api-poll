import type { AddSurveyRepository } from "../protocols/db/survey/add-survey-repository"
import type { AddSurveyParams } from "../use-cases/survey/add-survey/add-survey-protocols"
import type { LoadSurveyByIdRepository } from "../protocols/db/survey/load-survey-by-id-repository"
import type { SurveyModel } from "../use-cases/survey/load-survey-by-id/db-load-survey-by-id-protocol"
import type { SurveyResultModel, SaveSurveyResultRepository, SaveSurveyResultParams } from "../use-cases/survey-result/save-survey-result/db-save-survey-result-protocol"
import { mockSurveyModel, mockSurveyResult } from "@/domain/test"
import type { LoadSurveyResultRepository } from "../protocols/db/survey-result/load-survey-result-repository"

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

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return await Promise.resolve(mockSurveyResult())
        }
    }

    return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
        async load (surveyId: string): Promise<SurveyResultModel> {
            return await Promise.resolve(mockSurveyResult())
        }
    }
    return new LoadSurveyResultRepositoryStub()
}
