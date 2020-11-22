const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const template = fs.readFileSync('./template.js').toString()

const watcher = fs.watch('./service', {
    persistent: true, recursive: true
})
watcher.on('change', (event, filename) => {
    const pathname = path.resolve('./service', filename)
    const ext = path.extname(filename)
    const basename = path.basename(filename, ext)
    let method = basename.replace(/(post|get|options|put|patch|delete|head)-(.+)/g, '$1')
    if (!['post', 'get', 'options', 'put', 'patch', 'delete', 'head'].includes(method)) {
        method = ''
    }
    const fn = basename.replace(/(post|get|options|put|patch|delete|head)-(.+)/, '$2')
    const params = (fn.match(/_[^_]+/g) || []).map(item => item.replace(/^_(.+)/, '$1'))
    params.unshift('')
    const name = fn.replace(/([^_]+)(_[^_]+)*/, '$1')

    const exists = fs.existsSync(pathname)
    if (method && ext === '.js' && exists) {
        const data = fs.readFileSync(pathname)
        if (data.length === 0) {
            fs.writeFileSync(pathname, template.replace(/\{your-service-name\}/g, name))
            console.log('已生成服务:', name)
        }
    }
})

const configWatcher = fs.watch('./config.js', {
    persistent: true, recursive: true
})

configWatcher.on('change', (event, filename) => {
    const s = spawn('node', ['./apply-config.js'])
    s.on('message', console.log)
    s.on('exit', () => {
        console.log('配置已更新！')
    })
})