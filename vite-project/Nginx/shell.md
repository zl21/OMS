cd 到 Dockerfile所在目录

执行:
docker images
docker build -t vue3 .
docker tag vue3:latest registry.cn-hangzhou.aliyuncs.com/zl980712/vue3:v1.0
docker push registry.cn-hangzhou.aliyuncs.com/zl980712/vue3:v1.0
<!-- 文档: https://cr.console.aliyun.com/repository/cn-hangzhou/zl980712/omsui/details -->

FinalShell:
docker pull registry.cn-hangzhou.aliyuncs.com/zl980712/vue3:v1.0
docker kill vue3Web
docker rm vue3Web
docker run -p 20002:80 -d --name vue3Web registry.cn-hangzhou.aliyuncs.com/zl980712/vue3:v1.0 