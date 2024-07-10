import type { SaveSurveyResultRepository, SaveSurveyResultParams, SurveyResultModel } from "@/data/use-cases/survey-result/save-survey-result/db-save-survey-result-protocol"
import { Mongohelper } from "../helpers/mongo-helper"
import { ObjectId } from 'mongodb'
import type { LoadSurveyResultRepository } from "@/data/protocols/db/survey-result/load-survey-result-repository"

export class SurveyResultMongoRepository implements SaveSurveyResultRepository, LoadSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
        const surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
        await surveyResultsCollection.findOneAndUpdate({
            accountId: new ObjectId(data.accountId),
            surveyId: new ObjectId(data.surveyId)
        }, {
            $set: {
                answer: data.answer,
                date: data.date
            }
        }, {
            upsert: true,
            returnDocument: 'after'
        })
    }

    async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        const surveyResultsCollection = await Mongohelper.getCollection('surveyResults')
        const query = surveyResultsCollection.aggregate([{
            $match: {
                surveyId: new ObjectId(surveyId)
            }
        }, {
            $group: {
                _id: 0,
                data: {
                    $push: '$$ROOT'
                },
                total: {
                    $sum: 1
                }
            }
        }, {
            $unwind: {
                path: '$data'
            }
        }, {
            $lookup: {
                from: 'surveys',
                foreignField: '_id',
                localField: 'data.surveyId',
                as: 'survey'
            }
        }, {
            $unwind: {
                path: '$survey'
            }
        }, {
            $group: {
                _id: {
                    surveyId: '$survey._id',
                    question: '$survey.question',
                    date: '$survey.date',
                    total: '$total',
                    answer: '$data.answer',
                    answers: '$survey.answers'
                },
                count: {
                    $sum: 1
                }
            }
        }, {
            $project: {
                _id: 0,
                surveyId: '$_id.surveyId',
                question: '$_id.question',
                date: '$_id.date',
                answers: {
                    $map: {
                        input: '$_id.answers',
                        as: 'item',
                        in: {
                            $mergeObjects: ["$$item", {
                                count: {
                                    $cond: {
                                        if: {
                                            $eq: ["$$item.answer", "$_id.answer"]
                                        },
                                        then: "$count",
                                        else: 0
                                    }
                                },
                                percent: {
                                    $cond: {
                                        if: {
                                            $eq: ["$$item.answer", "$_id.answer"]
                                        },
                                        then: {
                                            $multiply: [{
                                                $divide: ["$count", "$_id.total"]
                                            }, 100]
                                        },
                                        else: 0
                                    }
                                }
                            }
                            ]
                        }
                    }
                }
            }
        }, {
            $group: {
                _id: {
                    surveyId: '$surveyId',
                    question: '$question',
                    date: '$date'
                },
                answers: {
                    $push: "$answers"
                }
            }
        }, {
            $project: {
                _id: 0,
                surveyId: '$_id.surveyId',
                question: '$_id.question',
                date: '$_id.date',
                answers: {
                    $reduce: {
                        input: '$answers',
                        initialValue: [],
                        in: {
                            $concatArrays: ["$$value", "$$this"]
                        }
                    }
                }
            }
        }, {
            $unwind: {
                path: '$answers'
            }
        }, {
            $group: {
                _id: {
                    surveyId: '$surveyId',
                    question: '$question',
                    date: '$date',
                    answer: '$answers.answer',
                    image: '$answers.image'
                },
                count: {
                    $sum: '$answers.count'
                },
                percent: {
                    $sum: '$answers.percent'
                }
            }
        }, {
            $project: {
                _id: 0,
                surveyId: '$_id.surveyId',
                question: '$_id.question',
                date: '$_id.date',
                answer: {
                    answer: '$_id.answer',
                    image: '$_id.image',
                    count: '$count',
                    percent: '$percent'
                }
            }
        }, {
            $sort: {
                "answer.count": -1
            }
        }, {
            $group: {
                _id: {
                    surveyId: '$surveyId',
                    question: '$question',
                    date: '$date'
                },
                answers: {
                    $push: '$answer'
                }
            }
        }, {
            $project: {
                _id: 0,
                surveyId: "$_id.surveyId",
                question: "$_id.question",
                date: "$_id.date",
                answers: "$answers"
            }
        }])
        const surveyResult: any = await query.toArray()
        return surveyResult?.length ? surveyResult[0] : null
    }
}
