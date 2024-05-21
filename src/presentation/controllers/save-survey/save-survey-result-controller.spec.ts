import type { LoadSurveyById, SurveyModel, httpRequest } from './save-survey-result-protocol'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { forbidden } from '../survey/load-survey/load-surveys-protocols'
import { InvalidParamError } from '@/presentation/errors'

const makeFakeSurveyData = (): SurveyModel => ({
    id: 'any_id',
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer'
    }],
    date: new Date()
})

const makeFakeRequest = (): httpRequest => ({
    params: {
        surveyId: 'any_id'
    }
})

const makeLoadSurveyById = (): LoadSurveyById => {
    class LoadSurveyByIdStub implements LoadSurveyById {
        async loadById (id: string): Promise<SurveyModel> {
            return await new Promise(resolve => resolve(makeFakeSurveyData()))
        }
    }
    return new LoadSurveyByIdStub()
}

interface SutTypes {
    sut: SaveSurveyResultController
    loadSurveyById: LoadSurveyById
}

const makeSut = (): SutTypes => {
    const loadSurveyById = makeLoadSurveyById()
    const sut = new SaveSurveyResultController(loadSurveyById)
    return {
        sut,
        loadSurveyById
    }
}

describe('SaveSurveyController', () => {
    test('Should call loadSurveyById with correct values ', async () => {
        const { sut, loadSurveyById } = makeSut()
        const spyLoadSurveyById = jest.spyOn(loadSurveyById, 'loadById')
        await sut.handle(makeFakeRequest())
        expect(spyLoadSurveyById).toHaveBeenCalledWith(makeFakeRequest().params.surveyId)
    })

    test('Should return 403 if loadSurveyById returns null', async () => {
        const { sut, loadSurveyById } = makeSut()
        // eslint-disable-next-line prefer-promise-reject-errors
        jest.spyOn(loadSurveyById, 'loadById').mockReturnValueOnce(null)
        const res = await sut.handle(makeFakeRequest())
        expect(res).toEqual(forbidden(new InvalidParamError('surveyId')))
    })
})
