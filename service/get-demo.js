const { BaseRequest, BaseController, Validator_NotEmpty } = require("txk-mvc");
const Koa = require('koa')

//访问示范：http://localhost:3000/demo?name=you

/**
 * 服务
 * @param {{body,query,headers,params}} data 
 * @returns {Promise}
 */
async function Service(data) {
    //your service code
    const { name } = data.query
    return 'hello,' + name
}


/**
 * 请求拦截（一般只修改应用的拦截规则）
 * @param {Koa.ParameterizedContext} ctx
 * @returns {Promise<{result:boolean,codo:number,msg:string,data:{body,query,headers,params}}>}
 */
async function Request(ctx) {
    const request = new BaseRequest(ctx)
    return request.setFn('your-service-name')
        //your validators
        .useQuery('name', new Validator_NotEmpty())
        .check()
}


/**
 * 控制器（一般不需要修改）
 * @param {Koa.ParameterizedContext} ctx
 */
async function Controller(ctx) {
    const controller = new BaseController(ctx)
    const request = await Request(ctx)
    if (!request.result) {
        return controller.error(request)
    }

    const result = await Service(request.data)
    return controller.success(result)
}

module.exports = Controller