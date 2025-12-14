const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Portfolio",
            version: "1.0.0",
            descrption: "API REST Node.js + PostgreSQL + JWT",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"],
} ;

module.exports = swaggerJSDoc(options) ;