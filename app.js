const { DefaultApplication } = require('txk-mvc')
const { app } = require('./config')
const router = require('./router')

class MyApplication extends DefaultApplication {
    getName() {
        return app.name
    }
    getDesc() {
        return app.desc
    }
    getPort() {
        return app.port
    }
    getServiceUrl() {
        return app.url
    }
}

const myApp = new MyApplication(router)
myApp.listen()