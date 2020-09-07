exports.swaggerDocument = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            title: 'APIs Document',
            description: 'This an example API to serve JSON response to the candidates',
            contact: {
                name: 'Fahim Hasnat',
                email: 'fahim.hasnat@v2.ltd',
                url: 'https://hoangtran.co'
            },
            servers: ['http://localhost:8000'],
            license: {
                name: 'eCRM 2.0'
            }
        }
    },
    apis: ["app.js"]
}