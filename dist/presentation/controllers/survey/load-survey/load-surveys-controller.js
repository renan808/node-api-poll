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
exports.LoadSurveysController = void 0;
const load_surveys_protocols_1 = require("./load-surveys-protocols");
class LoadSurveysController {
    constructor(loadSurvey) {
        this.loadSurvey = loadSurvey;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const surveys = yield this.loadSurvey.loadAll();
                return surveys.length ? (0, load_surveys_protocols_1.ok)(surveys) : (0, load_surveys_protocols_1.noContent)();
            }
            catch (error) {
                console.log(error);
                return (0, load_surveys_protocols_1.serverError)(error);
            }
        });
    }
}
exports.LoadSurveysController = LoadSurveysController;
//# sourceMappingURL=load-surveys-controller.js.map