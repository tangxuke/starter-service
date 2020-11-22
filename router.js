const Router = require('koa-router')
const fs = require('fs')
const path = require('path')
const root = path.resolve(__dirname, 'service')

/**
 * 生成目录路由
 * @param {string} pathname 
 * @returns {Router}
 */
function getRoutes(pathname) {
    const router = new Router()
    const files = fs.readdirSync(pathname)
    for (let file of files) {
        const filePath = path.resolve(pathname, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
            const childRouter = getRoutes(filePath)
            router.use('/' + file, childRouter.routes())
        } else {
            if (path.extname(file) === '.js') {
                const basename = path.basename(file, '.js')
                let method = basename.replace(/(post|get|options|put|patch|delete|head)-(.+)/g, '$1')
                if (!['post', 'get', 'options', 'put', 'patch', 'delete', 'head'].includes(method)) {
                    method = ''
                }
                const fn = basename.replace(/(post|get|options|put|patch|delete|head)-(.+)/, '$2')
                const params = (fn.match(/_[^_]+/g) || []).map(item => item.replace(/^_(.+)/, '$1'))
                params.unshift('')
                const name = fn.replace(/([^_]+)(_[^_]+)*/, '$1')
                const router_path = '/' + name + params.join('/:')
                /**
                 * @type {(ctx)=>void}
                 */
                const middle = require(filePath)
                if (typeof middle === 'function' && method) {
                    router.register(router_path, [method], middle)
                }
            }
        }
    }

    return router
}

const route = getRoutes(root)

module.exports = route