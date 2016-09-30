FROM node:6.4.0

ENV DOCKER true
ENV PUBLIC /public/

ADD . /wysiwyg
VOLUME /public

WORKDIR /wysiwyg
RUN apt-get update
ENV USER="user"
RUN apt-get install libelf1
RUN npm i
ENTRYPOINT ["npm", "run", "build"]
