#!/bin/bash                                                                                                                                                   
                                                                                                                                                              
 echo "aaaaaaaa44"                                                                                                                                                             
                                                                                                                                                              
# set ulimit                                                                                                                                                  
                                                                                                                                                              
ulimit -n 102400   

rm -rf opt/tengine/www/dist/
rm -rf /opt/tengine/conf/conf.d/                                                                                                                                                             
envsubst  '$WEB_HOST_URL,$JFLOW_HOST_URL,$UC_HOST_URL,$PRINT_HOST_URL,$PS_HOST_URL,$SCRM_HOST_URL' </conf.d/nginx.template> /opt/tengine/conf/conf.d/nginx.conf
cp -r /dist/ /opt/tengine/www/ 

# start nginx service                                                                                                                                         
                                                                                                                                                              
/opt/tengine/sbin/nginx    