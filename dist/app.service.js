"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <title>Backend Status</title>
          <style>
              body {
                  background-color: #800020; /* Color Vino */
                  color: white;
                  font-family: Arial, sans-serif;
                  margin: 0;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  text-align: center;
              }
              .main-title {
                  font-size: 3em;
                  font-weight: bold;
                  color: #FFD700; /* Amarillo Oscuro (Golden) */
                  margin-bottom: 20px;
              }
              .subtitle {
                  font-size: 1.2em;
                  color: white;
              }
          </style>
      </head>
      <body>
          <div class="main-title">Backend-LLM</div>
          <div class="subtitle">Tesis de Ricardo Falco y Julio Sarauz</div>
      </body>
      </html>`;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map