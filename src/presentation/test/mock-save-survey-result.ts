import type { LoadSurveyById, SurveyModel, SaveSurveyResult, SurveyResultModel, SaveSurveyResultParams } from "../controllers/save-survey/save-survey-result-protocol"
import { mockSurveyModel, mockSurveyResult } from '@/domain/test'

export const mockLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(mockSurveyModel()))
        }
    }
    return new LoadSurveyByIdStub()
}

export const mockSaveSurveyResult = (): SaveSurveyResult => {
    class SaveSurveyResultStub implements SaveSurveyResult {
        async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
            return await new Promise((resolve, reject) => resolve(mockSurveyResult()))
        }
    }
    return new SaveSurveyResultStub()
}
