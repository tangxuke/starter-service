git checkout .
git pull
docker rm -f redis-service-write
docker rmi tangxuke/redis-service-write
docker build -t tangxuke/redis-service-write .
docker run --name redis-service-write -d -p 20001:20001 tangxuke/redis-service-write
docker push tangxuke/redis-service-write
sleep 5s
echo
curl https://tangxuke.cn/service/redis/write/
echo
echo
echo