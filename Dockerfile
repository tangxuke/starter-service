FROM keymetrics/pm2
LABEL maintainer="tangxuke"
EXPOSE 5001
ADD . /node
ADD /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /node
RUN npm i --registry=https://registry.npm.taobao.org && npm i txk-mvc --registry=https://registry.npm.taobao.org
CMD ["pm2-docker","app.js","-i","max"]