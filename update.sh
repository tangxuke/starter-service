git checkout .
git pull
docker rm -f starter-service
docker rmi tangxuke/starter-service
docker build -t tangxuke/starter-service .
docker run --name starter-service -d -p 4001:4001 tangxuke/starter-service
docker push tangxuke/starter-service
sleep 5s
echo
curl https://tangxuke.cn/service/starter
echo
echo
echo