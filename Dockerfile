FROM centos:7
MAINTAINER Kuangming Shi

LABEL name="blood donor"
LABEL vendor="haxejs"

RUN yum -y install gcc gcc-c++ make

ADD node-v6.10.3-linux-x64.tar.xz /
RUN cp -a /node-v6.10.3-linux-x64/* /usr/ 
RUN rm -rf /node-v6.10.3-linux-x64


#RUN npm config set registry https://registry.cnpmjs.org
RUN npm config set registry https://registry.npm.taobao.org
#RUN npm install npm@latest -g
#RUN npm install -g node-gyp @angular/cli
RUN npm install -g @angular/cli@1.0.0


ADD ./Code   /opt/donorblood

RUN cd /opt/donorblood && npm install
RUN cd /opt/donorblood/client && npm install
RUN cd /opt/donorblood/client && ng build --env=demo
RUN cd /opt/donorblood && cp patches/FireLoop.js node_modules/@mean-expert/loopback-component-realtime/dist/modules/FireLoop.js

WORKDIR /opt/donorblood
# Start donorblood
EXPOSE 3000
CMD ["npm", "start"]
