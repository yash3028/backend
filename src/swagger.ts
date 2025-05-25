const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'User Access Management API',
    description: 'Auto-generated Swagger documentation',
  },
  host: 'localhost:8000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json'; 
const endpointsFiles = ['./src/app.ts'];    

swaggerAutogen(outputFile, endpointsFiles, doc);