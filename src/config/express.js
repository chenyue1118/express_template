// module dependencies
require('module-alias/register');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const yaml = require('js-yaml');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const limiter = require('@cc/config/rate-limit');
const logger = require('@cc/config/logger');
const createError = require('@cc/utils/error');
const routes = require('@cc/routes/index');


const app = express();

// app.use(express.static('public'));

 // the client’s IP address is understood as the left-most entry in the X-Forwarded-* header.
app.set('trust proxy', true);

// app.disable('x-powered-by');

// 设置跨域
app.use(cors());
// 压缩中间件
app.use(compression());
// 处理 post 参数
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/*' }));
// 设置请求限制
app.use(limiter.api);

// 设置日志打印 setup the logger for requests
app.use(morgan('combined', { stream: logger.stream }));

app.use(express.static('public'));

// mount all v1 APIs to /api/v1
app.use('/api/v1', routes);

// 配置文档
const swaggerSpec = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../docs/swagger.yaml')));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const swaggerSpecTest = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../docs/swagger_test.yaml')));
app.use('/api/docs_test', swaggerUi.serve, swaggerUi.setup(swaggerSpecTest));

// 测试接口
app.use('/test', (req, res) => {
  console.log(req.ips);
  res.send({ 'code': 200, 'message': 'test请求成功' })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // res.headersSent boolean 是否响应http请求头
  next(createError('Not Found', 'NoApiError', `API ${req.url} is not found.`));
})

// TODO: error handler

// module exports
module.exports = app
