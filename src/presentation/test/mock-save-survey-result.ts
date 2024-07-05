import type { LoadSurveyById, SurveyModel, SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from "../controllers/save-survey/save-survey-result-protocol"
import { mockSurveyModel, mockSurveyResult } from '@/domain/test'
import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"
export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return await Promise.resolve(mockSurveyModel())
        }
    }
    return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
           return await Promise.resolve(mockSurveyResult())
        }
    }
    return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
    class LoadSurveyResultStub implements LoadSurveyResult {
        async loadBySurveyId (data: string): Promise<SurveyResultModel | null> {
           return await Promise.resolve(mockSurveyResult())
        }
    }
    return new LoadSurveyResultStub()
}
