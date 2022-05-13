cd 到 Dockerfile所在目录

执行:
docker build -t omsui .
docker images
docker push registry.cn-hangzhou.aliyuncs.com/zl980712/omsui:v1.0
<!-- 文档: https://cr.console.aliyun.com/repository/cn-hangzhou/zl980712/omsui/details -->

FinalShell:
docker pull registry.cn-hangzhou.aliyuncs.com/zl980712/omsui:v1.0
docker kill UiWeb
docker run -p 20002:80 -d --name UiWeb registry.cn-hangzhou.aliyuncs.com/zl980712/omsui:v1.0