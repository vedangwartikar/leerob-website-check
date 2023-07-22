ARG NODE_BASE=node:18.16-alpine
# Stage: code
FROM ${NODE_BASE} AS code
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++ 

WORKDIR /usr/src/app
# the context of these operations is "dist/apps/next",
# you can view this configuration under `project.json` > `container` -> `options` -> `context`
COPY ./ ./

RUN npm i -g pnpm

RUN pnpm prune --prod --loglevel=verbose

# No need to compile code, code is compiled via nx and @nnext/nx-container
FROM ${NODE_BASE} AS dist
RUN apk add --no-cache dumb-init


# Add BUILD to the runtime environment
ARG BUILD
ENV BUILD=$BUILD

ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

# Copy installed dependencies from code stage
COPY --from=code /usr/src/app/node_modules ./node_modules


# Copy built application files
# RUN ls -la
COPY ./dist/server/server.js next.config.js ./

COPY .next ./.next

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000
# CMD ["ls", "-la"]
CMD ["dumb-init", "node", "server.js"]
