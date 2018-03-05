FROM node:8

USER root

WORKDIR /data/cxcloud-process-engine

COPY src/ /data/cxcloud-process-engine/src
COPY config/ /data/cxcloud-process-engine/config
COPY resources/ /data/cxcloud-process-engine/resources
COPY *.json /data/cxcloud-process-engine/

RUN npm install --silent
RUN npm run build

CMD ["npm", "run", "start:production"]
