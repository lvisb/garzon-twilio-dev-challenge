FROM node:22.3.0-alpine3.19

ARG DOCKER_USER
ARG DOCKER_USER_UID

ENV NODE_OPTIONS "--max-old-space-size=4096"

RUN umask 0002

# remove usuário e grupo node para trabalhar com o mesmo
# usuário e grupo do host
RUN deluser --remove-home node \
  && addgroup -S $DOCKER_USER -g $DOCKER_USER_UID \
  && adduser -S -G $DOCKER_USER -u $DOCKER_USER_UID $DOCKER_USER

USER $DOCKER_USER

WORKDIR /home/$DOCKER_USER/frontend/

COPY --chown=$DOCKER_USER:$DOCKER_USER ./package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=$DOCKER_USER:$DOCKER_USER /vite* ./
COPY --chown=$DOCKER_USER:$DOCKER_USER /postcss* ./
COPY --chown=$DOCKER_USER:$DOCKER_USER /tailwind* ./
COPY --chown=$DOCKER_USER:$DOCKER_USER /tsconfig* ./
COPY --chown=$DOCKER_USER:$DOCKER_USER /app ./app
COPY --chown=$DOCKER_USER:$DOCKER_USER /public ./public

RUN npm run build

ENTRYPOINT ["npm", "start"]

