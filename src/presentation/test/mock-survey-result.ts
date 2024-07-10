import type { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from "../controllers/save-survey/save-survey-result-protocol"
import { mockSurveyResult } from '@/domain/test'
import type { LoadSurveyResult } from "@/domain/use-cases/survey-result/load-survey-result"

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
