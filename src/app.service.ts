import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Botisfy | API Core</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              body {
                  background-color: #07080f;
                  color: white;
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  text-align: center;
                  position: relative;
                  overflow: hidden;
              }
              .bg-glow-1 {
                  position: absolute;
                  top: -20%;
                  right: -10%;
                  width: 600px;
                  height: 600px;
                  background: rgba(91, 106, 240, 0.15);
                  border-radius: 50%;
                  filter: blur(120px);
                  z-index: 0;
                  pointer-events: none;
              }
              .bg-glow-2 {
                  position: absolute;
                  bottom: -20%;
                  left: -10%;
                  width: 500px;
                  height: 500px;
                  background: rgba(0, 229, 192, 0.12);
                  border-radius: 50%;
                  filter: blur(120px);
                  z-index: 0;
                  pointer-events: none;
              }
              .grid-overlay {
                  position: absolute;
                  inset: 0;
                  background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                  background-size: 40px 40px;
                  z-index: 1;
                  pointer-events: none;
              }
              .container {
                  position: relative;
                  z-index: 10;
                  background: rgba(255, 255, 255, 0.02);
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  backdrop-filter: blur(16px);
                  -webkit-backdrop-filter: blur(16px);
                  padding: 3.5rem 5rem;
                  border-radius: 24px;
                  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
                  animation: fadeIn 1s ease-out;
              }
              .logo {
                  width: 70px;
                  height: 70px;
                  background: linear-gradient(135deg, #5b6af0, #00e5c0);
                  border-radius: 18px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-size: 32px;
                  font-weight: 900;
                  margin: 0 auto 24px;
                  box-shadow: 0 10px 25px rgba(91, 106, 240, 0.3);
                  color: white;
              }
              .main-title {
                  font-size: 2.5rem;
                  font-weight: 900;
                  background: linear-gradient(to right, #5b6af0, #00e5c0);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin-bottom: 12px;
                  letter-spacing: -0.5px;
              }
              .subtitle {
                  font-size: 1.1rem;
                  color: rgba(255, 255, 255, 0.5);
                  margin-bottom: 35px;
                  font-weight: 500;
              }
              .status-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 10px;
                  background: rgba(0, 229, 192, 0.1);
                  border: 1px solid rgba(0, 229, 192, 0.2);
                  color: #00e5c0;
                  padding: 10px 20px;
                  border-radius: 50px;
                  font-size: 0.85rem;
                  font-weight: 700;
                  letter-spacing: 1px;
                  text-transform: uppercase;
              }
              .status-dot {
                  width: 8px;
                  height: 8px;
                  background-color: #00e5c0;
                  border-radius: 50%;
                  box-shadow: 0 0 12px #00e5c0;
                  animation: pulse 2s infinite;
              }
              @keyframes pulse {
                  0% { box-shadow: 0 0 0 0 rgba(0, 229, 192, 0.6); }
                  70% { box-shadow: 0 0 0 10px rgba(0, 229, 192, 0); }
                  100% { box-shadow: 0 0 0 0 rgba(0, 229, 192, 0); }
              }
              @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
              }
              .footer {
                  position: absolute;
                  bottom: 30px;
                  width: 100%;
                  text-align: center;
                  font-size: 0.75rem;
                  color: rgba(255, 255, 255, 0.3);
                  z-index: 10;
                  line-height: 1.6;
              }
              .footer strong {
                  color: rgba(255, 255, 255, 0.5);
              }
          </style>
      </head>
      <body>
          <div class="bg-glow-1"></div>
          <div class="bg-glow-2"></div>
          <div class="grid-overlay"></div>
          
          <div class="container">
              <div class="logo">B</div>
              <div class="main-title">Botisfy AI Engine</div>
              <div class="status-badge">
                  <div class="status-dot"></div>
                  Sistemas Operativos
              </div>
          </div>

          <div class="footer">
              <strong>© 2026 Botisfy Inc. Todos los derechos reservados.</strong><br>
              Propiedad intelectual protegida. El acceso, copia o distribución no autorizada de esta API y sus endpoints<br>
              está estrictamente prohibido y penado por la ley. Entorno Seguro SSL v2.4.0
          </div>
      </body>
      </html>`;
  }
}