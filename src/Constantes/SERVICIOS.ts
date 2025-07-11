import { TEvaluacionService } from "src/Modulos/tevaluacion/tevaluacion.service";
import { TPostulanteService } from "src/Modulos/tpostulantes/tpostulantes.service";
import { TUsuarioService } from "src/Modulos/tusuario/tusuario.service";

export const SERVICIOS = [
    TUsuarioService,
    TPostulanteService,
    TEvaluacionService
];