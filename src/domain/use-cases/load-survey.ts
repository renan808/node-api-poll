import type { SurveyAnswer } from "./add-survey"

export interface SurveyModel {
    question: string
    answers: SurveyAnswer[]
    date: Date
}

export interface LoadSurveys {
    loadAll (): Promise<SurveyModel[]>
}
