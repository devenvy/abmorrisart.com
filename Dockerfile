# Stage 0, based on Node.js, to build and compile Angular
FROM node:12 as node
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm ci
COPY ./ /app/
RUN node node_modules/@angular/cli/bin/ng build --configuration=production --source-map

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:stable-alpine
COPY --from=node /app/dist/abmorrisart/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
