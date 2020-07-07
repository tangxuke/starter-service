FROM keymetrics/pm2
LABEL maintainer="tangxuke"
EXPOSE 20001
ADD . /node
WORKDIR /node
RUN npm i --registry=https://registry.npm.taobao.org && npm i txk-mvc --registry=https://registry.npm.taobao.org
CMD ["pm2-docker","app.js","-i","max","--watch"]