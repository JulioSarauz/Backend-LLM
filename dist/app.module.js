"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const tevaluacion_schema_1 = require("./modules/evaluacion/tevaluacion.schema");
const tpostulantes_schema_1 = require("./modules/postulantes/tpostulantes.schema");
const SERVICIOS_1 = require("./common/constants/SERVICIOS");
const tpostulantes_controller_1 = require("./modules/postulantes/tpostulantes.controller");
const tevaluacion_controller_1 = require("./modules/evaluacion/tevaluacion.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const suscripciones_module_1 = require("./modules/suscripciones/suscripciones.module");
const pagos_module_1 = require("./modules/pagos/pagos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env'],
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: tevaluacion_schema_1.TEvaluacion.name, schema: tevaluacion_schema_1.TEvaluacionSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: tpostulantes_schema_1.TPostulante.name, schema: tpostulantes_schema_1.TPostulanteSchema }]),
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            suscripciones_module_1.SuscripcionesModule,
            pagos_module_1.PagosModule
        ],
        controllers: [app_controller_1.AppController, tpostulantes_controller_1.PostulantesController, tevaluacion_controller_1.TEvaluacionController],
        providers: [app_service_1.AppService, ...SERVICIOS_1.SERVICIOS],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map