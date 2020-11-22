git checkout .
git pull
docker rm -f starter
docker rmi tangxuke/starter
docker build -t tangxuke/starter .
docker run --name starter -d -p 5001:5001 tangxuke/starter
docker push tangxuke/starter
sleep 5s
echo
curl https://tangxuke.cn/service/starter
echo
echo
echo