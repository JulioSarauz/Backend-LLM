"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICIOS = void 0;
const tevaluacion_service_1 = require("../../modules/evaluacion/tevaluacion.service");
const tpostulantes_service_1 = require("../../modules/postulantes/tpostulantes.service");
exports.SERVICIOS = [
    tpostulantes_service_1.TPostulanteService,
    tevaluacion_service_1.TEvaluacionService
];
//# sourceMappingURL=SERVICIOS.js.map