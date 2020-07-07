const { AppConfig } = require('txk-mvc')

module.exports = new AppConfig({
    app_name: 'starter-service',
    app_desc: '这是一个微服务模板',
    app_port: 3000,
    service_url: 'http://localhost:3000'
})