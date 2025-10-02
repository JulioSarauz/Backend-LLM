import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
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
}
