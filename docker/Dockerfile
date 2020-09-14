FROM  registry.cn-hangzhou.aliyuncs.com/dtstack/tengine:2.1.1

ADD  dist /dist
ADD  docker/conf/nginx.template  /conf.d/


ADD docker/conf/start.sh  /
RUN chmod +x  /start.sh



RUN \
      apt-get update   && apt-get install -y gettext 
