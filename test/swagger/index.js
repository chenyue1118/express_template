const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(6011, () => {
  console.log('Serve at 6011');
})
