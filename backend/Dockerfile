FROM node:22.3.0-alpine3.19

ARG DOCKER_USER
ARG DOCKER_USER_UID
ARG DOCKER_GROUP
ARG DOCKER_GROUP_GID

RUN umask 0002

# remove usuário e grupo node para trabalhar com o mesmo
# usuário e grupo do host
RUN deluser --remove-home node \
  # Adicionando o grupo principal
  && addgroup -S $DOCKER_GROUP -g $DOCKER_GROUP_GID \
  # Adicionando o usuário com o grupo principal definido
  && adduser -S -G $DOCKER_GROUP -u $DOCKER_USER_UID $DOCKER_USER

USER $DOCKER_USER

WORKDIR /home/$DOCKER_USER/backend/

COPY --chown=$DOCKER_USER:$DOCKER_GROUP /package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=$DOCKER_USER:$DOCKER_GROUP /tsconfig* ./
COPY --chown=$DOCKER_USER:$DOCKER_GROUP /nest-cli.json ./
COPY --chown=$DOCKER_USER:$DOCKER_GROUP /src ./src

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]

