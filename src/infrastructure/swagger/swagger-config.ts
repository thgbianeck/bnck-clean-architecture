import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sua API',
    version: '1.0.0',
    description: 'Descrição da sua API',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL do seu servidor
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/infrastructure/api/routes/*.ts'], // Caminho para os arquivos de rotas que contêm as anotações do Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
