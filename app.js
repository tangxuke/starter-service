const { DefaultApplication } = require('txk-mvc')
const { app_name, app_desc, app_port, service_url } = require('./config')
const router = require('./router')

class MyApplication extends DefaultApplication {
    getName() {
        return app_name
    }
    getDesc() {
        return app_desc
    }
    getPort() {
        return app_port
    }
    getServiceUrl() {
        return service_url
    }
}

const app = new MyApplication(router)
app.listen()