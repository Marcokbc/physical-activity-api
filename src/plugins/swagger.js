const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../package.json');

const swaggerPlugin = {
  plugin: HapiSwagger,
  options: {
    info: {
      title: 'Physical Activities API',
      version: Pack.version,
      description: 'API de atividades fisicas com autenticação',
    },

    grouping: 'tags',
    documentationPath: '/docs',

    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Insira: **Bearer seu_token_aqui**',
      },
    },

    security: [
      {
        bearerAuth: []
      }
    ],
  },
};

const swaggerDependencies = [Inert, Vision];

module.exports = { swaggerPlugin, swaggerDependencies };
