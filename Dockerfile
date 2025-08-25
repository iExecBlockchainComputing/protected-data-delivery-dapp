FROM node:20-alpine3.22 as builder

WORKDIR /app
COPY . .
RUN npm ci && \
    npm run build

FROM node:20-alpine3.22 as runner

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/build /app
ENTRYPOINT [ "node", "/app/app.js" ]
