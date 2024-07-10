"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyResultMongoRepository = void 0;
const mongo_helper_1 = require("../helpers/mongo-helper");
const mongodb_1 = require("mongodb");
class SurveyResultMongoRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyResultsCollection = yield mongo_helper_1.Mongohelper.getCollection('surveyResults');
            yield surveyResultsCollection.findOneAndUpdate({
                accountId: new mongodb_1.ObjectId(data.accountId),
                surveyId: new mongodb_1.ObjectId(data.surveyId)
            }, {
                $set: {
                    answer: data.answer,
                    date: data.date
                }
            }, {
                upsert: true,
                returnDocument: 'after'
            });
        });
    }
    loadBySurveyId(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyResultsCollection = yield mongo_helper_1.Mongohelper.getCollection('surveyResults');
            const query = surveyResultsCollection.aggregate([{
                    $match: {
                        surveyId: new mongodb_1.ObjectId(surveyId)
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
                }]);
            const surveyResult = yield query.toArray();
            return (surveyResult === null || surveyResult === void 0 ? void 0 : surveyResult.length) ? surveyResult[0] : null;
        });
    }
}
exports.SurveyResultMongoRepository = SurveyResultMongoRepository;
//# sourceMappingURL=survey-result-mongo-repository.js.map