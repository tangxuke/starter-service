const { app } = require('./config')
const fs = require('fs')

//修改Dockerfile
let dockerfile = `FROM keymetrics/pm2
LABEL maintainer="tangxuke"
EXPOSE {port}
ADD . /node
ADD /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /node
RUN npm i --registry=https://registry.npm.taobao.org && npm i txk-mvc --registry=https://registry.npm.taobao.org
CMD ["pm2-docker","app.js","-i","max"]`
//修改端口号
dockerfile = dockerfile.replace(/\{port\}/g, app.port)
fs.writeFileSync('./Dockerfile', dockerfile)

//修改update.sh
let update_sh = `git checkout .
git pull
docker rm -f {name}
docker rmi tangxuke/{name}
docker build -t tangxuke/{name} .
docker run --name {name} -d -p {port}:{port} tangxuke/{name}
docker push tangxuke/{name}
sleep 5s
echo
curl {url}
echo
echo
echo`
update_sh = update_sh.replace(/\{name\}/g, app.name)
    .replace(/\{port\}/g, app.port)
    .replace(/\{url\}/g, app.url)
fs.writeFileSync('./update.sh', update_sh)

//修改package.json
const json = require('./package.json')
json.name = app.name
json.description = app.desc
fs.writeFileSync('./package.json', JSON.stringify(json))