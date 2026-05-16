# CommonPub instance — single-stage image.
# node_modules is kept in the final image on purpose: `drizzle-kit push`
# (DB schema sync at deploy time) reads the schema from
# node_modules/@commonpub/schema and needs drizzle-kit available.
FROM node:22-alpine

RUN apk add --no-cache wget
WORKDIR /app

# Install all deps (dev deps required for `nuxt build` and `drizzle-kit push`).
# `npm install` (not `npm ci`): the pinned @commonpub/* 0.4.x train pulls two
# commander majors, which npm's lockfile writer leaves in a state `npm ci`
# rejects. `npm install` resolves it correctly and reproducibly enough here.
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# Build the Nuxt app
COPY . .
RUN npm run build && mkdir -p /app/uploads

ENV NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
