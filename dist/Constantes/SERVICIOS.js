"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICIOS = void 0;
const tevaluacion_service_1 = require("../Modulos/tevaluacion/tevaluacion.service");
const tpostulantes_service_1 = require("../Modulos/tpostulantes/tpostulantes.service");
const tusuario_service_1 = require("../Modulos/tusuario/tusuario.service");
exports.SERVICIOS = [
    tusuario_service_1.TUsuarioService,
    tpostulantes_service_1.TPostulanteService,
    tevaluacion_service_1.TEvaluacionService
];
//# sourceMappingURL=SERVICIOS.js.map