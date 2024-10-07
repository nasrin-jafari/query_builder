# Build Stage
FROM 172.16.50.33:8443/other/node:18.17.0 AS build

RUN rm -rf /etc/apt/sources.list.d/* /etc/apt/sources.list
RUN echo "deb http://172.16.50.33:8081/repository/edr-apt/ bookworm main" > /etc/apt/sources.list
RUN echo 'Acquire::http::Proxy "http://172.16.50.33:8081/repository/edr-apt/";' > /etc/apt/apt.conf.d/01proxy
RUN echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until

WORKDIR /app
RUN yarn config set registry http://172.16.50.33:8081/repository/edr-npm/
RUN echo "registry=http://172.16.50.33:8081/repository/edr-npm/" > .npmrc
COPY package.json yarn.lock ./
RUN yarn install --production --network-timeout 1000000 --ignore-engines --ignore-platform
COPY . .
RUN yarn build 

# Nginx Stage
FROM 172.16.50.33:8443/other/nginx:alpine AS production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
